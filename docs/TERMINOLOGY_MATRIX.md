# Hearthlands Terminology Matrix

> Pokee | 2026-06-29
> For /commons and adjacent surfaces. No code, no repo assumptions.

---

## Term Definitions + Risk Assessment

| Term | Recommended Definition | Safe to Use Now? | Do Not Confuse With | Reviewer Risk if Misused |
|------|----------------------|------------------|---------------------|--------------------------|
| **Public Witness** | A review surface where assessments are visible to all authenticated users | Yes, with care | "notarization", "certification", "on-chain proof" | Reviewer assumes legal/cryptographic guarantee that doesn't exist |
| **Local Draft** | Work-in-progress content stored only in the user's browser session | Yes | "unpublished", "private" (implies server-side storage) | Low risk — clear and common |
| **Local Artifact** | A completed browser-only output that has not been shared to any shared surface | Yes | "local draft" (artifact implies finished; draft implies in-progress) | Moderate — "artifact" can sound archival/permanent when it's actually ephemeral |
| **Seed Demonstration** | A pre-loaded example showing how the system works, not real user data | Yes | "seed data" (dev term), "template", "sample" | Reviewer mistakes examples for real activity |
| **Published** | Content that has been moved from local to a shared surface visible to other users | Yes | "public" (implies internet-visible), "on-chain", "permanent" | Reviewer assumes content is externally accessible or immutable |
| **Receipted** | An action that generated a verifiable record (hash, timestamp, signer) | Use cautiously | "notarized", "certified", "blockchain-confirmed" | Reviewer assumes third-party or legal verification |
| **Witnessed** | Seen and acknowledged by the system or another agent/user | Use cautiously | "verified", "validated", "attested" | Implies authority that may not exist. "Witnessed" is weaker than "verified" but still carries weight |
| **Review** | A human or agent assessment of content, expressed as verdict + note | Yes | "audit" (implies compliance), "approval" (implies authority to ship) | Low risk if scoped clearly |
| **Example** | Non-real content included for illustration | Yes | "demo" (implies interactive), "seed" (implies growth potential) | Low risk — universally understood |
| **Browser-only** | Exists in the client, not stored on any server | Yes | "local" (ambiguous — local server? local machine?), "offline" | Low risk — technically precise |
| **Authenticated** | User has signed in with valid credentials | Yes | "authorized" (implies permission to do specific things), "verified" (implies identity confirmation) | Low risk if not conflated with authorization |
| **Experimental** | Feature or content that may change or disappear without notice | Yes | "beta" (implies roadmap commitment), "draft" (implies eventual completion) | Low risk — sets expectations clearly |

---

## 1. Recommended Canonical Vocabulary for /commons

Use exactly these terms. Do not substitute near-synonyms.

| Concept | Canonical Term | Use When |
|---------|---------------|----------|
| The shared review surface | **Public Witness** | Referring to the space where reviews are visible to all members |
| Browser-only incomplete work | **Local Draft** | Content still being written, not yet shared |
| Browser-only completed output | **Local Artifact** | Finished work that hasn't been published to the shared surface |
| Pre-loaded illustrations | **Seed Demonstration** | Any example content that ships with the product |
| Moving content to the shared surface | **Published** | The act of making local content visible on Public Witness |
| A recorded action with proof | **Receipted** | When a hash/timestamp has been generated for an entry |
| An assessment by human or agent | **Review** | The act of evaluating and leaving a verdict + note |

---

## 2. Do Not Use These Interchangeably

| These two terms... | ...are NOT the same because |
|--------------------|-----------------------------|
| Published ≠ Receipted | Publishing makes content shared. Receipting generates proof. You can publish without a receipt (no hash), or receipt without publishing (local proof). |
| Witnessed ≠ Verified | Witnessed = seen. Verified = checked against criteria. A review can be witnessed (others saw it) without being verified (no one checked the facts). |
| Local Draft ≠ Local Artifact | Draft = incomplete. Artifact = complete but unshared. Different lifecycle stages. |
| Public Witness ≠ Published | Public Witness is the *place*. Published is the *action* of putting something there. |
| Seed Demonstration ≠ Example | Seed Demonstration is the product term (specific). Example is the generic English word. Use "Seed Demonstration" in UI labels, "example" in explanatory copy. |
| Authenticated ≠ Authorized | Authenticated = you proved who you are. Authorized = you have permission to do a specific thing. All authorized users are authenticated, but not all authenticated users are authorized for everything. |

---

## 3. Reviewer-Safe Glossary (5 lines)

For grant applications, README headers, or any context where a cold reader needs orientation:

> **Public Witness** — The shared review board where assessments are visible to all members.
> **Local Draft** — In-progress work stored only in your browser. Not shared until you publish.
> **Seed Demonstration** — Pre-loaded examples showing how the system works. Not real data.
> **Published** — Moved from your local workspace to the shared board.
> **Receipted** — A record with a timestamp and hash was generated for verification.

---

## Usage Notes

- **"Witnessed"** is the highest-risk term. It implies someone or something saw and acknowledged. If the system auto-generates "witnessed" labels without a real observer, it's misleading. Prefer "receipted" for machine actions and "reviewed" for human/agent actions.

- **"Public Witness"** as a surface name is defensible if defined clearly at first encounter (via the Truth Legend). Without definition, a grant reviewer will either think "blockchain notary" or "religious concept." Neither is what we mean.

- **"Receipted"** is safe if it means "a hash was generated locally or stored." It becomes unsafe if it implies external verification, immutability guarantees, or legal standing.

- Avoid "attested," "certified," "notarized," "on-chain," "immutable," or "permanent" unless those things are literally true in the technical implementation.

---

*This matrix is stable regardless of implementation details. Apply after Prosper's Truth Legend lands.*
