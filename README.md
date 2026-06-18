# RAG.ai - Local Document Q&A Chat Assistant (Node.js Port)

A local Retrieval-Augmented Generation (RAG) Document Assistant written in Node.js. This application allows users to upload PDF, TXT, DOCX, and Markdown files, segment them into overlapping chunks, embed them using a custom local embedder, store them in a persistent SQLite database, and chat with them.

---

## Key Features

- **Multi-Format Loader**: Dedicated parsers for PDF, TXT, DOCX, and Markdown files.
- **Configurable Sliding-Window Chunking**: Custom chunk sizes and overlap thresholds.
- **Local-First Embeddings**: Custom offline mathematical vectorizer running entirely in JavaScript.
- **Persistent Vector Store**: Uses SQLite locally to index, search, and delete document contexts.
- **Modern HUD UI**: Glassmorphic dashboard layout supporting drag-and-drop uploads, database health indicators, statistics panel, and typewriter animations.

---

## Directory Structure

```
RaG/
├── app.js                 # Express server and REST API endpoints
├── config.js              # Environment configs and path definitions
├── package.json           # Node.js dependencies
├── .gitignore             # Git ignore lists
├── uploads/               # Physically uploaded text files on disk
├── database/              # SQLite database files
├── templates/
│   └── index.html         # Single Page Dashboard HTML layout
├── static/
│   ├── css/
│   │   └── style.css      # Glassmorphic responsive stylesheet
│   └── js/
│       └── app.js         # Frontend controllers
└── utils/
    ├── embeddings/        # Custom offline embedder sub-modules
    ├── chunking/          # Sliding window text chunking algorithms
    ├── loader/            # PDF, Word, and OCR text parsers
    └── db/                # SQLite and MySQL database wrappers
```

---

## Setup & Running

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Run the Server
```bash
npm start
```
The server runs on http://127.0.0.1:5000.
