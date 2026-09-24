# ♻️ BinView — AI Waste Segregation System

**BinView** is an AI-powered waste segregation system that analyzes a user's waste description and determines the appropriate waste category using an LLM-based backend.

The project combines **FastAPI, Python, and Large Language Models** with a modern, responsive frontend to make waste segregation simple and accessible.

---

## What Problem Does It Solve?

People often struggle to determine which category a particular waste item belongs to.

For example:

> "A container of yogurt"

Instead of manually figuring out how to dispose of the item, BinView allows the user to describe the waste and uses AI to analyze it and provide a classification.

---

## Features

- AI-powered waste classification
- Intelligent waste categorization
- Fully responsive interface
- Modern glassmorphism-inspired UI
- FastAPI backend
- REST API architecture
- CORS-enabled frontend integration

---

## Project Architecture

```
          User
           │
           ▼
┌──────────────────────┐
│     Web Frontend     │
│    HTML / CSS / JS   │
└──────────┬───────────┘
           │
           │ POST /classify
           ▼
┌──────────────────────┐
│      FastAPI         │
│      Backend         │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│     LLM Pipeline     │
│      llm_call()      │
└──────────┬───────────┘
           │
           ▼
      Classification
           │
           ▼
┌──────────────────────┐
│   Result to User     │
│ Category + Guidance  │
└──────────────────────┘
```

---

## Tech Stack

### Backend

- Python
- FastAPI
- Pydantic
- LLM API
- Langchain

### Frontend

- HTML5
- CSS3
- JavaScript


---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/garbage-segregation.git
```

Navigate into the project:

```bash
cd garbage-segregation
```

---

### 2. Create a Virtual Environment

```bash
python -m venv .venv
```

Activate it on Windows:

```bash
.venv\Scripts\activate
```

For macOS/Linux:

```bash
source .venv/bin/activate
```

---

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

---

## ▶ Run the Backend

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

The API will be available at:

```text
http://127.0.0.1:8000
```

FastAPI also provides interactive API documentation:

```text
http://127.0.0.1:8000/docs
```

## How It Works

1. The user enters a description of the waste.
2. The frontend sends the description to the FastAPI `/classify` endpoint.
3. FastAPI validates the request.
4. The `llm_call()` function sends the description to the configured LLM.
5. The LLM analyzes the waste.
6. The classification is returned to the frontend.
7. BinView displays the category, dustbin colour and disposal guidance.

---

## ♻️ Waste Categories

| Category | Examples |
|---|---|
| Wet Waste | Food scraps, vegetable peels, organic waste |
| Dry Waste | Paper, cardboard, plastic packaging |
| Sanitory Waste | Sanitary pads, tampons, diapers |
| E-Waste | Phones, chargers, electronic components |

> Waste-management rules can vary by location. BinView provides AI-assisted classification and should not be treated as a replacement for local waste-disposal regulations.

---
