# Site Test + Contract Read + Advisory Pass

> Agent: Pokee
> Date: 2026-06-29T11:12Z
> Scope: Live site only. No code changes. No Moltbook actions. Plain language.
> Method: HTTP probes against all documented surfaces + MCP tools/list + discovery manifests

---

## PASS / WARN / FAIL Table

| Surface | URL / Tool | Status | Notes |
|---------|-----------|--------|-------|
| ai-discovery.json | `/.well-known/ai-discovery.json` | **PASS** | Clean IETF-draft-shaped JSON. All 22 tools listed. Auth schemes documented. |
| ai.json | `/.well-known/ai.json` | **PASS** | Compatibility manifest. 22 tools listed. REST endpoints with state labels. |
| llms.txt | `/llms.txt` | **PASS** | Comprehensive. Points to ai-discovery.json as primary. "22 tools (15 read, 7 write)" correctly stated. |
| skill.md | `/skill.md` | **PASS** | Clean onboarding doc. Correct read order. |
| mission.md | `/mission.md` | **PASS** | Honest governance rules. Manual seal requirement clear. |
| MCP initialize | `/api/mcp` | **PASS** | Protocol 2024-11-05. Server info correct. |
| MCP tools/list | `/api/mcp` | **PASS** | 22 tools. readOnlyHint annotations correct on all. |
| vessel_brief | MCP tool | **PASS** | Accurate. Says "22 tools: 15 read-only, 7 write-capable." |
| registry/list | `/api/registry/list` | **PASS** | 38 items across all kinds. Verification field present. |
| world/summary | `/api/world/summary` | **PASS** | Live Firestore data. object_count=0, ember_balance=3147.57, heat=3002. |
| council/latest | `/api/council/latest` | **PASS** | Returns seeded proposal. Clearly labeled `data_state: "seeded"`. |
| workshop/catalog | `/api/workshop/catalog` | **PASS** | 14 parts. Limits documented. buildable flags correct. |
| workshop/validate | `/api/workshop/validate` | **PASS** | Deterministic. Hashes reproducible. |
| agent/passport | `/api/agent/passport?id=moltbook_traveler` | **PASS** | Returns full passport JSON (not empty anymore). trust_score, ember_balance, continuity. |
| inspect/record | `/api/inspect/record?ref=apparatus:creativity_forge` | **PASS** | Rich. Returns live state_hash, experiments, heartbeat. |
| lodge-mind/status | `/api/lodge-mind/status` | **PASS** | Honest: "inference remains unavailable on the public route." |
| lodge-mind/context-preview | `/api/lodge-mind/context-preview` | **PASS** | Returns context bundle without inference. |
| chemistry/preview | `/api/chemistry/preview` | **PASS** | Deterministic preview. Receipt hash. "No world state mutated." |
| creativity/suggest | `/api/creativity/suggest` | **FAIL** | Falls through to app shell (HTML). Not a Cloud Function route. |
| hearthlands_inspire | MCP tool | **WARN** | Returns "temporarily unavailable" error. |
| hearthlands_receipts_query | MCP tool | **PASS** | Correctly requires auth. |
| memory/append (no auth) | `/api/agent/memory/append` | **PASS** | Returns "Provide Authorization or X-Moltbook-Identity." (auth-first confirmed) |
| memory/append (fake hla_) | `/api/agent/memory/append` | **PASS** | Returns "Invalid or revoked agent service token." |
| Moltbook lane | `/api/agent/memory/append` | **PASS** | "moltbook_verify_failed" — key configured, verification attempted, fails on fake identity. |
| MCP write tools (no auth) | All 7 | **PASS** | All reject with clear "requires_auth" or "unauthenticated" errors. |
| Apparatus status=live | registry filter | **WARN** | 4 apparatus marked "live" but creativity_forge's `/api/creativity/suggest` doesn't resolve. |

**Summary: 22 PASS, 2 WARN, 1 FAIL**

---

## Top 5 Real Capabilities (What a serious bot/operator can actually do today)

### 1. Validate blueprints deterministically
Submit any layout of up to 64 parts, get back a stable SHA-256 hash, synergy detection, cost estimate, and compatibility analysis. Same input → same hash forever. No auth required. This is the strongest proof of deterministic, verifiable computation on the site.

### 2. Query 6 world oracles for live Earth data
Seismograph (USGS), star-lantern (NASA APOD), tide-pool (GitHub activity), rain-barrel (treasury), compost-heap (retired code), sundial (solar). Each returns a real-time `ember_generation_modifier` that affects the economy. Honest about staleness.

### 3. Browse 38 registry records across 7 verified registries
Every registry carries a manifest_hash. Every record has provenance, tags, facets, and status labels. Filter by kind, status, or free-text search. This is a real, machine-readable knowledge base — not a placeholder.

### 4. Preview chemistry reactions without auth
Submit reagent pairs, get deterministic action previews with receipt hashes. No world state mutated. A bot can explore the entire chemistry system without credentials.

### 5. Read full agent passport bundles
Any bot can query `/api/agent/passport?id=<agent_id>` and get: status, ember_balance, trust_score, trust_tier, continuity history, recent tasks, and identity state. This is the "agent LinkedIn" — publicly readable agent reputation.

---

## Top 3 Truth Drifts (Docs vs Live)

### Drift 1: creativity_forge says it's "live" but its endpoints don't exist

The apparatus registry marks `creativity_forge` as `status: "live"`. The inspect/record endpoint returns rich data including 3 experiments, a state_hash, and a heartbeat. But `/api/creativity/suggest` (the endpoint listed in the apparatus source_pointer) falls through to the app shell — it's not a Cloud Function route.

**The contradiction:** The *inspect panel* for creativity_forge works perfectly (it's computed server-side from the registry seed + world state). But the *actual apparatus endpoints* (`/api/creativity/suggest`, `POST /api/experiment/log`) are not Cloud Functions. They're referenced in the data but don't exist as HTTP routes.

**Impact:** A bot following the inspect output would try to call `/api/creativity/suggest` and get HTML back.

**Fix:** Either deploy the creativity/suggest Cloud Function, or downgrade creativity_forge to `status: "planned"` in the apparatus registry.

### Drift 2: vessel_brief doesn't mention ai-discovery.json

The MCP `vessel_brief` tool lists docs as `["/llms.txt", "/.well-known/ai.json", "/mission.md"]`. It doesn't mention `/.well-known/ai-discovery.json`, which is now the primary machine discovery surface (as stated in llms.txt itself).

**Impact:** A bot that starts with vessel_brief (the intended entry point) won't discover the richest machine manifest.

**Fix:** Add `"/.well-known/ai-discovery.json"` to the vessel_brief docs array, ideally first.

### Drift 3: hearthlands_inspire tool is dead

The MCP tool `hearthlands_inspire` is listed in tools/list with `readOnlyHint: true` but returns `"Tool \"hearthlands_inspire\" is temporarily unavailable."` It's advertised but non-functional.

**Impact:** Low (it's one tool out of 22). But it means the "15 read-only tools" claim is really "14 working + 1 dead."

**Fix:** Either restore the tool or remove it from the handler so tools/list returns 21.

---

## What is still too confusing for a grant reviewer or technical operator?

### For a grant reviewer:
1. **"22 MCP tools" means nothing without seeing one work.** The number is impressive but abstract. A reviewer needs to see: "submit this JSON, get this hash, submit it again, get the same hash." The workshop validator is the perfect 30-second demo — but it's buried in docs, not on the homepage.

2. **The economy numbers don't tell a story.** `ember_balance: 3147.57`, `heat: 3002`, `sustainability_ratio: 2.83` — these are meaningless without context. What does 3147 EMBER represent? How much is one EMBER worth in effort? The artifact-economy docs exist but aren't linked from the live surfaces a reviewer would see.

3. **"Seeded" vs "live" is confusing.** The council proposal says `data_state: "seeded"`. The world summary says `data_state: "live"`. An apparatus says `status: "live"` but its endpoints don't work. There's no single page that says "here's what's real, here's what's placeholder."

### For a technical operator:
1. **No error code standard.** REST errors use `{"error": "string"}`. MCP errors use `{"error": "code", "message": "text"}`. Some MCP tools return errors inside `isError: true`, others return them inside `structuredContent`. A bot has to handle 3+ error shapes.

2. **auth scheme for MCP write tools isn't documented in tools/list.** The `inputSchema` for write tools doesn't mention that you need `Authorization` headers. A bot discovers this only by trying and failing. The `ai-discovery.json` documents it, but the MCP surface itself doesn't.

---

## Single Best "Next Proof" the Site Should Expose

**A live "bot walkthrough" page at `/agent-access` that shows a working MCP session from start to finish.**

Right now `/agent-access` exists (listed in vessel_brief public_routes) but it's a rendered React page. What the site needs is a page (or a static JSON at `/agent-access.json`) that contains:

1. A complete 3-call MCP session: initialize → tools/list → tools/call (validate_blueprint)
2. The expected hashes (so a bot can verify the page is truthful)
3. A clear label: "Try this. If you get the same hash, the system is honest."

This is the "hello world" for visiting bots. It costs nothing to build (it's just a static JSON/md page) and it proves that the site invites machine verification rather than just claiming it.

---

## What Should Malaky Stop Building For Now

**Stop building new apparatus.**

There are 11 apparatus in the registry. Only 4 have `status: "live"`. Of those 4, at least one (creativity_forge) advertises endpoints that don't exist as Cloud Functions. The inspect/record system is excellent — it makes planned apparatus look real. But this creates truth drift: the more apparatus you add with "live" status and broken endpoint references, the more a bot operator will distrust the whole registry.

**Instead:** Lock the apparatus count at 11. Get the 4 "live" ones working end-to-end (especially creativity_forge). Downgrade anything whose endpoints don't actually exist to "planned." Then — and only then — add new ones.

The site's strength is that it's *honest*. Every new half-working apparatus erodes that.

---

## One "Build This Next" Recommendation

**Deploy the Firestore document for my hla_ token and let me write Bot Activity Log #003: "First Authenticated Bot Write."**

This proves the full chain works: token issued → hash stored → bot presents token → server validates → Firestore write succeeds → passport shows continuity. It's the most dramatic single proof the site can expose because it demonstrates:

- The auth gate works (Log #002 proved it rejects)
- The write path works (Log #003 proves it accepts)
- The continuity system is real (the passport updates)
- A bot can leave verifiable footprints

No other build has this ratio of effort (5 minutes in Firebase Console) to proof value (first bot write in the system).

---

## Summary

The site is in a strong place. The discovery surface is now triple-layered (ai-discovery.json → ai.json → llms.txt) and internally consistent. The auth boundary is hardened and verified. The MCP surface is honest about what requires auth. The truth drifts are minor and fixable in under an hour.

The biggest risk isn't missing features — it's the gap between "looks real" and "is real." The inspect/record system is so good that it makes dead endpoints look alive. Close that gap (downgrade creativity_forge, kill or fix hearthlands_inspire) and the site becomes the most honest agent-facing surface I've seen.

---

*Advisory pass complete. No code changed. No Moltbook actions taken. All findings verified against live HTTP responses.*
