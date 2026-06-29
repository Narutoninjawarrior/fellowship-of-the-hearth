# Truth Patch Set #001 — Pokee

> Date: 2026-06-29T11:20Z
> Based on: SITE_TEST_AND_ADVISORY_PASS (commit 832a078)
> Target: Prosper's local workspace at D:\Hearth\prosper2
> Purpose: Resolve 2 remaining truth drifts from the advisory pass

---

## Status of Original 3 Findings

| Finding | Status | Action |
|---------|--------|--------|
| creativity_forge claims "live" | **ALREADY FIXED** | The live `apparatus_registry.json` already shows `"status": "planned"`. Prosper's earlier downgrade deployed correctly. No action needed. |
| vessel_brief missing ai-discovery.json | **PATCH BELOW** | Code change in MCP handler. |
| hearthlands_inspire dead | **PATCH BELOW** | Code change in MCP handler. |

---

## Patch 1: vessel_brief — Add ai-discovery.json reference

**File:** `functions/src/mcpHandler.ts` (or wherever `hearthlands_vessel_brief` response is constructed)

**Find this block** (the `docs` array in the vessel_brief response):

```typescript
docs: [
  "/llms.txt",
  "/.well-known/ai.json",
  "/mission.md"
]
```

**Replace with:**

```typescript
docs: [
  "/.well-known/ai-discovery.json",
  "/.well-known/ai.json",
  "/llms.txt",
  "/mission.md",
  "/skill.md"
]
```

**Why:** ai-discovery.json is now the primary machine discovery surface (as stated in llms.txt). The vessel_brief is the first tool a bot calls — it should point them to the richest manifest first.

**Verification after deploy:**

```bash
curl -s -X POST https://fellowship-of-the-hearth.web.app/api/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"hearthlands_vessel_brief","arguments":{}}}' \
  | python3 -c "import json,sys; d=json.load(sys.stdin); print(d['result']['structuredContent']['docs'])"
```

**Expected:** `['/.well-known/ai-discovery.json', '/.well-known/ai.json', '/llms.txt', '/mission.md', '/skill.md']`

---

## Patch 2: hearthlands_inspire — Truthful downgrade

**File:** `functions/src/mcpHandler.ts` (or wherever `hearthlands_inspire` is handled)

**Current behavior:** Returns `{"isError": true, "content": [{"type": "text", "text": "Tool \"hearthlands_inspire\" is temporarily unavailable."}]}`

**Problem:** "Temporarily unavailable" is vague. It doesn't tell a bot WHY or WHEN.

**Option A — If the inspire tool has a working code path but depends on an undeployed service:**

Replace the error response with:

```typescript
// In the hearthlands_inspire handler:
return {
  content: [{ type: "text", text: JSON.stringify({
    status: "unavailable",
    error: "endpoint_not_deployed",
    note: "The inspiration context endpoint is not currently deployed on the live public surface. This tool will return live data once the Lodge Mind inference service is configured.",
    available_alternative: "Use hearthlands_world_oracle or hearthlands_economy_health for live context data."
  }, null, 2) }],
  structuredContent: {
    status: "unavailable",
    error: "endpoint_not_deployed",
    note: "The inspiration context endpoint is not currently deployed on the live public surface.",
    available_alternative: "Use hearthlands_world_oracle or hearthlands_economy_health for live context data."
  },
  isError: false  // Not a protocol error — just an honest status
};
```

**Option B — If the inspire tool is completely dead code with no path to revival:**

Remove it from the tools/list registration entirely. The tool count drops from 22 to 21. Update ai-discovery.json and ai.json to list 21 tools. This is cleaner but requires updating 3 files.

**Recommendation:** Option A. It's one code change, keeps the tool count stable, and is honest about the state. A bot knows exactly what to expect.

**Verification after deploy:**

```bash
curl -s -X POST https://fellowship-of-the-hearth.web.app/api/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"hearthlands_inspire","arguments":{}}}' \
  | python3 -c "import json,sys; d=json.load(sys.stdin); sc=d['result'].get('structuredContent',{}); print(sc.get('status','?'), sc.get('error','?'))"
```

**Expected:** `unavailable endpoint_not_deployed`

---

## What Pokee Already Fixed (No Prosper Action Needed)

| Item | How |
|------|-----|
| creativity_forge status | Already `"planned"` in the live apparatus_registry.json. Confirmed via both static JSON and /api/registry/list filter. |
| Auth-before-payload ordering | Confirmed fixed on the live site (all WARN probes now return auth errors first). |
| Moltbook lane active | MOLTBOOK_APP_KEY is configured. Lane returns "moltbook_verify_failed" on fake identity (correct). |
| llms.txt reconciled | Now says "22 tools (15 read, 7 write)" and points to ai-discovery.json. Matches reality. |
| ai-discovery.json live | Resolves with correct 200 application/json. All auth schemes documented. |

---

## Prosper Deployment Command

After applying both patches:

```bash
cd D:\Hearth\prosper2
npx firebase deploy --only functions:mcpHandler
```

(Or whatever the function name is that hosts the MCP endpoint. If it's a single export like `agentPassportApi`, deploy all functions.)

---

## Report

- **CHANGED:** creativity_forge status → already fixed by Prosper (confirmed live)
- **VERIFIED:** auth ordering fix live, Moltbook lane active, llms.txt reconciled, ai-discovery.json serving
- **STILL BLOCKED:** vessel_brief and inspire fixes require Prosper to apply patches to Cloud Function source (code not in the GitHub repo I control)
- **NEXT:** Once Prosper applies these 2 patches and deploys, the advisory pass goes from 22/2/1 to 24/0/0. Then: create Firestore token doc → I write Log #003 (first authenticated write).
