# 🛡️ BASTION
## Autonomous AI Cyber Defense Arena

> **ATTACK → DEFEND → MUTATE → VERIFY → EVOLVE**

BASTION is a controlled, AI-driven cybersecurity arena designed to demonstrate how software can be continuously challenged by an adaptive attacker, repaired by a defensive agent, tested against mutated attack paths, and independently verified.

Instead of treating security as a one-time scan or a simple "find and fix" workflow, BASTION creates a closed-loop adversarial testing environment where every defense is challenged by the next attack.

---

## 🚀 Why BASTION?

Modern applications change rapidly. A security patch may block the exact exploit that was discovered without proving that:

- the underlying root cause was actually fixed,
- a slightly different attack path cannot bypass the patch,
- normal application functionality still works, and
- the security improvement can be independently verified.

BASTION addresses this gap with a controlled multi-agent security loop.

### The core idea

```text
        ┌──────────────┐
        │  🔴 RED AI   │
        │    ATTACK    │
        └──────┬───────┘
               │
               ▼
        ┌──────────────┐
        │   OBSERVE    │
        │    EVIDENCE  │
        └──────┬───────┘
               │
               ▼
        ┌──────────────┐
        │  🔵 BLUE AI  │
        │    DEFEND    │
        └──────┬───────┘
               │
               ▼
        ┌──────────────┐
        │     PATCH    │
        │  + TEST      │
        └──────┬───────┘
               │
               ▼
        ┌──────────────┐
        │ 🟢 GREEN AI  │
        │    MUTATE    │
        └──────┬───────┘
               │
               ▼
        ┌──────────────┐
        │  🔴 RE-ATTACK│
        └──────┬───────┘
               │
               ▼
        ┌──────────────┐
        │ 🟣 JUDGE AI  │
        │    VERIFY    │
        └──────┬───────┘
               │
               ▼
            EVOLVE
```

---

# 🎯 Problem Statement

Traditional application security workflows are often fragmented:

```text
Scan → Find Issue → Fix → Move On
```

This can leave an important question unanswered:

> **Does the application remain secure when the attacker changes the attack path after the fix?**

BASTION explores a different workflow:

```text
Attack
  ↓
Observe
  ↓
Defend
  ↓
Patch
  ↓
Mutate Attack
  ↓
Re-Attack
  ↓
Independently Verify
  ↓
Repeat
```

The goal is not simply to produce more security alerts.

The goal is to produce **evidence-backed security improvement**.

---

# 💡 Proposed Solution

BASTION creates an isolated cybersecurity arena containing an intentionally vulnerable application.

Specialized AI agents interact with that environment under strict controls.

### 🔴 RED — Adversarial Agent

The Red Agent represents the attacker.

Responsibilities:

- Discover the allowed attack surface
- Analyze application behavior
- Select an attack objective
- Execute controlled security tests
- Capture evidence of successful or failed attacks
- Retry after defensive changes

**Objective:** Break the target within the permitted sandbox.

---

### 🔵 BLUE — Defensive Agent

The Blue Agent represents the defender.

Responsibilities:

- Analyze findings and evidence
- Identify probable root cause
- Propose or implement a controlled fix
- Run regression/security tests
- Verify that normal functionality remains intact
- Prepare the system for re-testing

**Objective:** Produce a durable defense rather than only blocking one known request.

---

### 🟢 GREEN — Mutation / Evolution Agent

The Green Agent is responsible for adversarial variation.

Responsibilities:

- Study the original attack
- Generate controlled attack variants
- Change attack parameters or paths
- Target the same underlying weakness from different angles
- Challenge the Blue Agent's patch

**Objective:** Prevent the system from succeeding merely because it memorized one attack pattern.

---

### 🟣 JUDGE — Independent Verification Agent

The Judge is intentionally separated from the Red and Blue objectives.

Responsibilities:

- Inspect execution evidence
- Compare before/after results
- Verify whether the vulnerability was actually mitigated
- Check regression results
- Reject unsupported claims
- Produce a final verification decision

**Objective:** Prove the result using evidence instead of trusting an agent's statement.

---

# 🔄 Closed-Loop Security Model

BASTION's central innovation is the interaction between the agents.

### Cycle 1

```text
RED
 ↓
Find vulnerability
 ↓
Prove exploit
 ↓
BLUE
 ↓
Find root cause
 ↓
Patch
```

### Cycle 2

```text
GREEN
 ↓
Generate attack variant
 ↓
RED
 ↓
Re-attack
 ↓
Does the patch survive?
```

### Verification

```text
JUDGE
 ↓
Review evidence
 ↓
Compare before/after
 ↓
Check functionality
 ↓
PASS / FAIL
```

If the attack still succeeds, the system can continue the loop.

---

# 🧠 What Makes BASTION Different?

BASTION is **not** positioned as a replacement for established cybersecurity platforms.

Existing tools already provide valuable capabilities such as:

- vulnerability scanning,
- static analysis,
- automated penetration testing,
- AI-assisted remediation,
- security regression testing.

BASTION focuses on a different combination:

### 1. Adversarial co-evolution

The attacker does not simply replay the same test after a patch.

The attack can evolve.

### 2. Root-cause pressure

The defender is evaluated on whether the weakness is actually mitigated, not merely whether one request was blocked.

### 3. Attack mutation

The Green Agent creates controlled variations designed to challenge the defense.

### 4. Independent verification

The Judge does not simply accept Red or Blue's claims.

It evaluates evidence.

### 5. Measurable security evolution

Each cycle can produce metrics such as:

- Attack success rate
- Attack variant success rate
- Defense score
- Number of successful/blocked attempts
- Regression status
- Evidence count
- Verification result
- Number of security cycles

---

# 🧪 Example Scenario

BASTION can contain an intentionally vulnerable demo banking application.

### Initial state

```text
Application Security
        ↓
    Vulnerable
```

The Red Agent discovers an allowed vulnerability and demonstrates it.

```text
RED
 ↓
Attack succeeds
 ↓
Evidence captured
```

The Blue Agent analyzes the issue.

```text
BLUE
 ↓
Root cause identified
 ↓
Patch created
 ↓
Regression tests
```

The Green Agent then creates variants.

```text
GREEN
 ↓
Variant A
Variant B
Variant C
Variant D
```

Red attempts the new variants.

```text
Known attack      → BLOCKED
Variant A         → BLOCKED
Variant B         → BLOCKED
Variant C         → BLOCKED
Variant D         → BLOCKED
```

The Judge then independently evaluates the evidence.

```text
BEFORE  → Vulnerable
PATCH   → Applied
RETEST  → Attacks blocked
REGRESSION → Passed

             ↓

        VERIFIED
```

---

# 📊 Example Metrics

A demonstration dashboard may display:

| Metric | Before | After |
|---|---:|---:|
| Attack Success | 82% | 8% |
| Defense Score | 41/100 | 92/100 |
| Successful Variants | 7 | 0 |
| Regression Tests | — | Passed |
| Verification | — | Verified |

> These numbers are demonstration targets/examples. They should only be presented as actual results when produced by the running prototype.

---

# 🏗️ System Architecture

```text
┌──────────────────────────────────────────────┐
│                  FRONTEND                    │
│       React + Vite + TypeScript              │
│                                              │
│  Arena • Upload • Live Test • Results        │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│              ORCHESTRATOR API                │
│            Python + FastAPI                  │
│                                              │
│  State Machine • Agent Routing • Policies    │
└──────────────┬───────────────┬───────────────┘
               │               │
               ▼               ▼
       ┌──────────────┐   ┌──────────────┐
       │ AI AGENTS    │   │ EVENT SYSTEM │
       │              │   │              │
       │ Red          │   │ WebSockets   │
       │ Blue         │   │ Telemetry    │
       │ Green        │   │ Logs         │
       │ Judge        │   │ Evidence     │
       └──────┬───────┘   └──────────────┘
              │
              ▼
┌──────────────────────────────────────────────┐
│             SECURITY TOOLING                 │
│                                              │
│ Playwright • OWASP ZAP • Semgrep             │
│ Controlled exploit/verifier tools            │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│             ISOLATED SANDBOX                 │
│                                              │
│ Docker / Docker Compose                     │
│ Intentionally Vulnerable Demo Application    │
│ Isolated Database                            │
└──────────────────────────────────────────────┘
```

---

# 🖥️ Frontend Experience

The BASTION interface is designed around a six-stage user journey.

### 01 — Boot

A minimal BASTION activation screen.

### 02 — About

Explains:

> **ATTACK. DEFEND. EVOLVE.**

and introduces the closed-loop concept.

### 03 — Upload & Test

The user selects an application/project and an isolated testing environment.

### 04 — Live Test

The user watches:

```text
RED ATTACK
     ↓
BLUE DEFEND
     ↓
GREEN MUTATE
     ↓
RED RE-ATTACK
     ↓
JUDGE VERIFY
```

### 05 — Results

Displays:

- Attack success
- Defense score
- Evidence
- Security cycles
- Verification status
- Regression results

### 06 — Protected Product

Shows:

```text
ORIGINAL PRODUCT
       ↓
BASTION SECURITY EVOLUTION
       ↓
PROTECTED PRODUCT
```

while emphasizing preservation of application functionality and architecture.

---

# 🛠️ Technology Stack

## Frontend

- React
- Vite
- TypeScript
- CSS / component-based UI

## Backend

- Python
- FastAPI
- WebSockets

## AI / Agent Layer

- Model-provider replaceable architecture
- Gemini / OpenAI / Claude-compatible reasoning layer
- Specialized agent roles
- Deterministic demo mode

## Cybersecurity Tooling

- Playwright
- OWASP ZAP
- Semgrep
- Controlled verification utilities

## Infrastructure

- Docker
- Docker Compose
- Isolated internal network

## Database

- SQLite for the prototype
- PostgreSQL as a future production option

---

# 🔐 Security & Safety

BASTION is designed as a **controlled security research and demonstration environment**.

The prototype must only operate against:

- intentionally vulnerable applications,
- local targets,
- containerized targets,
- explicitly authorized test environments.

### BASTION must NOT:

- scan random public IP addresses,
- attack third-party websites,
- use real credentials,
- launch unrestricted exploitation,
- execute uncontrolled destructive actions,
- bypass authorization controls.

### Sandbox principle

```text
User Project
     ↓
Controlled Import
     ↓
Isolated Container
     ↓
Security Test
     ↓
Evidence
     ↓
Destroy / Reset Sandbox
```

The architecture is intended to make the safe testing boundary explicit.

---

# ⚙️ Project Structure

The frontend repository currently follows a Vite/React structure similar to:

```text
BASTION/
│
├── public/
│
├── src/
│   ├── assets/
│   │   └── images/
│   │
│   ├── components/
│   │
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── types.ts
│   └── vite-env.d.ts
│
├── .env.example
├── .gitignore
├── README.md
├── index.html
├── metadata.json
├── package.json
├── tsconfig.json
└── vite.config.ts
```

The backend and sandbox services can be added alongside the existing frontend as development progresses.

---

# 🚀 Getting Started

## Prerequisites

Install:

- Node.js 18+ or a current LTS version
- npm
- Git

For the full BASTION environment:

- Python 3.11+
- Docker Desktop
- Docker Compose

---

## 1. Clone the repository

```bash
git clone https://github.com/ShrimYadav/Bastion.1.git
cd Bastion.1
```

---

## 2. Install frontend dependencies

```bash
npm install
```

---

## 3. Configure environment variables

Copy the example environment file.

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

macOS/Linux:

```bash
cp .env.example .env
```

Do not commit API keys or other secrets.

---

## 4. Start the frontend

```bash
npm run dev
```

Vite will provide a local development URL, normally similar to:

```text
http://localhost:5173
```

---

## 5. Build for production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

# 🧩 Planned Backend Structure

The backend can be organized as:

```text
backend/
├── app/
│   ├── main.py
│   ├── api/
│   ├── agents/
│   │   ├── red.py
│   │   ├── blue.py
│   │   ├── green.py
│   │   └── judge.py
│   ├── orchestrator/
│   ├── sandbox/
│   ├── security/
│   ├── database/
│   └── models/
│
├── tests/
├── requirements.txt
└── Dockerfile
```

This structure may evolve as implementation progresses.

---

# 🔌 Example API Flow

The eventual backend can expose endpoints conceptually similar to:

```text
POST /api/test/start
```

Start a controlled security test.

```text
GET /api/test/{id}
```

Get test status.

```text
WS /api/test/{id}/events
```

Stream live agent events.

```text
GET /api/test/{id}/results
```

Get final security results.

```text
GET /api/test/{id}/report
```

Export an evidence-backed report.

Exact endpoints may change during implementation.

---

# 🧠 Deterministic Demo Mode

BASTION should support a deterministic demo mode.

This is important for hackathon reliability.

The demonstration should work even if:

- an external AI API is unavailable,
- network access is unavailable,
- API credits are exhausted,
- an LLM produces unexpected output.

Demo Mode can simulate a realistic security cycle while preserving the same event and UI architecture:

```text
RED discovers vulnerability
        ↓
Attack succeeds
        ↓
BLUE identifies root cause
        ↓
Patch applied
        ↓
GREEN creates variants
        ↓
RED retries
        ↓
Attacks blocked
        ↓
JUDGE verifies
```

Live model-driven behavior can then be enabled as an optional capability.

---

# 📈 Evaluation Metrics

BASTION can measure:

### Attack Success Rate

Percentage of controlled attack attempts that succeed.

### Defense Score

A composite score based on mitigation and verification results.

### Mutation Resilience

How many generated attack variants are blocked after a fix.

### Regression Safety

Whether the security patch breaks expected application functionality.

### Evidence Coverage

Whether important claims have corresponding execution evidence.

### Verification Confidence

How strongly the Judge can support the final PASS/FAIL decision.

---

# 🏆 Hackathon Relevance

## Selected Themes

### 🤖 Artificial Intelligence

BASTION uses multiple specialized AI agents with different objectives.

### 🔐 Cybersecurity

The project focuses on controlled adversarial testing, remediation, mutation and verification.

BASTION is intentionally focused on **AI + Cybersecurity**, rather than adding sustainability without a genuine technical connection.

---

# 💼 Real-World Applications

BASTION's architecture could eventually support:

### Startups

Security testing before product releases.

### Web Applications

Automated security regression testing.

### APIs

Continuous adversarial validation of API behavior.

### AI-Generated Software

Security testing for rapidly generated or frequently changing code.

### Developer CI/CD

Security gates for pull requests and releases.

### Security Education

Interactive attacker-versus-defender training.

---

# 🔮 Future Scope

## Phase 1 — Hackathon MVP

- Controlled vulnerable Demo Bank
- Red Agent
- Blue Agent
- Green Mutation Agent
- Judge Agent
- Orchestrator
- Live dashboard
- Evidence
- Security score
- Deterministic Demo Mode

## Phase 2 — Developer Workflow

- Git integration
- CI/CD security gates
- Pull-request testing
- Automated regression suites

## Phase 3 — Broader Attack Surface

- REST APIs
- Containers
- Cloud configurations
- Authentication systems
- AI application security

## Phase 4 — Security Memory

- Historical attack variants
- Reusable attack playbooks
- Security trend analysis
- Long-term resilience scoring

---

# 🥊 Positioning

BASTION does not claim that autonomous security testing or AI remediation is new.

Existing platforms already address parts of this problem.

BASTION's focus is the **closed-loop interaction**:

```text
ATTACK
  ↓
DEFEND
  ↓
MUTATE
  ↓
RE-ATTACK
  ↓
INDEPENDENT VERIFY
  ↓
EVOLVE
```

The project demonstrates this interaction inside a controlled, observable environment.

### The key question BASTION asks:

> **Can an AI defense survive an AI attack that changes after every patch?**

---

# 📚 Research & References

The project is informed by established cybersecurity methodologies and existing security platforms.

- OWASP Web Security Testing Guide  
  https://owasp.org/www-project-web-security-testing-guide/

- NIST AI 100-2e2025 — Adversarial Machine Learning Taxonomy  
  https://csrc.nist.gov/pubs/ai/100/2/e2025/final

- Pentera — Automated Security Validation  
  https://pentera.io/

- Snyk — AI-powered security remediation  
  https://snyk.io/

These references are used for methodology and competitive positioning. BASTION does not claim to replace these platforms.

---

# 👥 Team

## Neural Nexus

**Project:** BASTION — Autonomous AI Cyber Defense Arena

**Hackathon:** CODEनीति 2026

**Themes:** Artificial Intelligence + Cybersecurity

### Team Members

- Shrim Yadav — Team Lead / [Role]
- [Member Name] — [Role]
- [Member Name] — [Role]

---

# 🔗 Project Links

### GitHub

https://github.com/ShrimYadav/Bastion.1

### Live Prototype

_Add deployment URL here after deployment._

### Presentation

_Add final PPT link/file here._

---

# 📜 License

This project is currently intended as a hackathon prototype and cybersecurity research demonstration.

A formal open-source license can be added before public production release.

---

# ⚠️ Disclaimer

BASTION is designed for authorized, controlled cybersecurity testing only.

Do not use the system against systems, applications, networks, accounts or infrastructure that you do not own or have explicit permission to test.

The demonstration environment should remain isolated and intentionally vulnerable.

---

# ⭐ Final Idea

BASTION is built around a simple principle:

> **Don't just find the hole. Fix it, mutate the attack, and prove the defense survives the next attack.**

**BASTION — ATTACK. DEFEND. EVOLVE.**
