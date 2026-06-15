<div align="center">

<br/>

```
███╗   ██╗███████╗██╗   ██╗██████╗  █████╗
████╗  ██║██╔════╝██║   ██║██╔══██╗██╔══██╗
██╔██╗ ██║█████╗  ██║   ██║██████╔╝███████║
██║╚██╗██║██╔══╝  ██║   ██║██╔══██╗██╔══██║
██║ ╚████║███████╗╚██████╔╝██║  ██║██║  ██║
╚═╝  ╚═══╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝

██████╗ ███████╗███████╗███████╗ █████╗ ██████╗  ██████╗██╗  ██╗
██╔══██╗██╔════╝██╔════╝██╔════╝██╔══██╗██╔══██╗██╔════╝██║  ██║
██████╔╝█████╗  ███████╗█████╗  ███████║██████╔╝██║     ███████║
██╔══██╗██╔══╝  ╚════██║██╔══╝  ██╔══██║██╔══██╗██║     ██╔══██║
██║  ██║███████╗███████║███████╗██║  ██║██║  ██║╚██████╗██║  ██║
╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
```

### *Multi-Agent AI Research Automation Platform*

<br/>

[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Groq](https://img.shields.io/badge/Groq-LLM_API-F59E0B?style=for-the-badge)](https://groq.com)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)](https://vercel.com)
[![JWT](https://img.shields.io/badge/JWT-Auth-FB015B?style=for-the-badge&logo=jsonwebtokens)](https://jwt.io)

<br/>

> **Type a topic. Get a fully structured, cited, multi-section research report — in seconds.**

<br/>

🔗 **[Live Demo](https://your-vercel-url.vercel.app)** · **[Backend API](https://your-render-url.onrender.com)**

<br/>

</div>

---

## What is NeuraResearch AI?

NeuraResearch AI is a full-stack research automation platform that goes beyond simple LLM prompting. It runs a **4-agent pipeline** — Planner → Search → Research → Citation — where each agent handles a distinct job, then combines the outputs into a structured, referenced report on any topic you give it.

Reports are persisted per-user in MongoDB, exportable as PDF, and the whole system runs behind JWT authentication with a clean React frontend — production-deployed on Vercel + Render.

---

## The 4-Agent Pipeline

```
┌────────────────────────────────────────────────────────────────────────┐
│                        NeuraResearch Pipeline                          │
│                                                                        │
│   Your Topic                                                           │
│       │                                                                │
│       ▼                                                                │
│  ┌─────────────┐                                                       │
│  │   Planner   │  ← Decomposes topic into structured section outline  │
│  │    Agent    │                                                       │
│  └──────┬──────┘                                                       │
│         │  [ Introduction, Applications, Challenges, Future Scope ]   │
│         ▼                                                              │
│  ┌─────────────┐                                                       │
│  │   Search    │  ← Retrieves live web context per section            │
│  │    Agent    │    (articles, summaries, URLs)                       │
│  └──────┬──────┘                                                       │
│         │  Promise.all() → parallel section fetching                  │
│         ▼                                                              │
│  ┌─────────────┐                                                       │
│  │  Research   │  ← Synthesizes topic + section + context via Groq   │
│  │    Agent    │    into detailed markdown-formatted content          │
│  └──────┬──────┘                                                       │
│         │                                                              │
│         ▼                                                              │
│  ┌─────────────┐                                                       │
│  │  Citation   │  ← Formats source URLs into a structured            │
│  │    Agent    │    references section                               │
│  └──────┬──────┘                                                       │
│         │                                                              │
│         ▼                                                              │
│   📄 Structured Report  →  MongoDB  →  PDF Export                     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Agent Breakdown

<table>
<tr>
<td width="50%" valign="top">

### 🧠 Planner Agent
Takes your raw topic and returns a structured outline — the sections that will become your report. Sets the entire downstream workflow.

**Input:** `"Quantum Computing"`
**Output:**
```
Introduction
Applications
Advantages
Challenges
Future Scope
```

---

### 🔍 Search Agent
Fetches live web context for every section in parallel using `Promise.all()`. Returns articles, summaries, and source URLs — grounding the report in real information.

</td>
<td width="50%" valign="top">

### 📝 Research Agent
Receives the topic, section title, and retrieved web context, then uses Groq to generate detailed, coherent content for each section. The actual writer in the pipeline.

**Output preview:**
```markdown
## Applications of Quantum Computing

Quantum computing has transformative
applications across cryptography,
drug discovery, optimization...
```

---

### 📚 Citation Agent
Converts collected source URLs into a clean, numbered reference list appended to the final report.

</td>
</tr>
</table>

---

## Features

| Category | What's included |
|---|---|
| **AI Pipeline** | 4-agent workflow · Prompt chaining · Parallel generation via `Promise.all` |
| **Auth & Security** | JWT authentication · bcrypt password hashing · Protected routes |
| **Research Management** | Persistent report storage · Search history · View, delete previous reports |
| **Export** | Markdown rendering · PDF export |
| **Deployment** | Vercel (frontend) · Render (backend) · MongoDB Atlas (database) |

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js, React Router, Axios, React Markdown, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas, Mongoose |
| **AI** | Groq API, OSS LLMs |
| **Auth** | JWT, bcrypt |
| **Deployment** | Vercel, Render |

---

## Project Structure

```
NeuraResearch-AI/
│
├── backend/
│   ├── agents/
│   │   ├── plannerAgent.js       ← Topic decomposition into sections
│   │   ├── searchAgent.js        ← Web context retrieval per section
│   │   ├── researchAgent.js      ← Content synthesis via Groq
│   │   └── citationAgent.js      ← Reference formatting
│   │
│   ├── controllers/              ← Research generation logic
│   ├── routes/                   ← Express route definitions
│   ├── models/                   ← Mongoose schemas (User, Report)
│   ├── middleware/               ← JWT verification
│   └── server.js
│
├── frontend/
│   └── src/
│       ├── components/           ← Sidebar, ReportViewer, Auth forms
│       ├── pages/                ← Dashboard, Login, Signup
│       ├── services/             ← Axios API client
│       └── App.jsx
│
└── README.md
```

---

## Getting Started

### 1. Clone

```bash
git clone https://github.com/your-username/neuraresearch-ai.git
cd neuraresearch-ai
```

### 2. Backend

```bash
cd backend
npm install
```

Create `.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
```

```bash
npm run dev
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## API Reference

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/signup` | ✗ | Create new account |
| `POST` | `/api/auth/login` | ✗ | Get JWT token |
| `POST` | `/api/research/generate` | ✓ | Run the 4-agent pipeline |
| `GET` | `/api/research/history` | ✓ | Fetch user's report history |
| `GET` | `/api/research/:id` | ✓ | Retrieve a specific report |
| `DELETE` | `/api/research/:id` | ✓ | Delete a report |

---

## Engineering Highlights

```
  4-agent pipeline   ·  Planner → Search → Research → Citation
  Promise.all()      ·  Parallel section generation for speed
  10+ REST APIs      ·  Full CRUD with JWT-protected routes
  MongoDB Atlas      ·  Persistent, user-scoped report storage
  Cloud-deployed     ·  Vercel + Render + MongoDB Atlas
```

---

## Roadmap

- [ ] Real-time streaming responses (SSE)
- [ ] Vector database + RAG integration
- [ ] Multi-LLM routing (model selection per task)
- [ ] Semantic search across report history
- [ ] Agent memory across sessions
- [ ] Public report sharing
- [ ] Team collaboration workspaces

---

<div align="center">

Built by **[Ashay Tiwari](https://linkedin.com/in/ashay-tiwari-55a0b727b)**

*AI Engineer · Full Stack Developer · GenAI Systems*

[![GitHub](https://img.shields.io/badge/GitHub-ashaytiwari--repo-181717?style=flat-square&logo=github)](https://github.com/ashaytiwari-repo)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Ashay_Tiwari-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/in/ashay-tiwari-55a0b727b)
[![Email](https://img.shields.io/badge/Email-ashaytiwari7@gmail.com-EA4335?style=flat-square&logo=gmail&logoColor=white)](mailto:ashaytiwari7@gmail.com)

<br/>

*If NeuraResearch saved you an hour of research, give it a ⭐*

</div>
