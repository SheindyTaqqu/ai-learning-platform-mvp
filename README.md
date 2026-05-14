# AI-Driven Learning Platform - Mini MVP

A mini learning platform that allows users to select topics to learn, receive AI-generated lessons, and view their learning history.

---

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas + Mongoose
- **Frontend:** Angular (TypeScript)
- **AI Integration:** Mock local response (clear interface for OpenAI replacement)
- **Other:** Docker Compose, dotenv

---

## Project Structure

```
ai-learning-platform-mvp/
├── backend/
│   ├── controllers/        # Route handlers
│   ├── models/             # Mongoose schemas
│   ├── routes/             # Express routes
│   ├── services/           # AI service (mock / OpenAI)
│   ├── app.js              # Server entry point
│   ├── seed.js             # DB seeder
│   └── .env                # Environment variables (not committed)
├── frontend/
│   └── src/app/
│       ├── components/     # Angular components
│       └── services/       # API service
└── docker-compose.yml      # MongoDB local setup
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB via Docker)
- Angular CLI (`npm install -g @angular/cli`)

---

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd ai-learning-platform-mvp
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Fill in your MongoDB URI and start the server:

```bash
node app.js
```

Server runs on: `http://localhost:5000`

---

### 3. Seed the Database

Run once to populate categories and sub-categories:

```bash
node seed.js
```

---

### 4. Frontend Setup

```bash
cd frontend
npm install
ng serve
```

App runs on: `http://localhost:4200`

---

### 5. Docker (Optional - for local MongoDB)

If you prefer local MongoDB instead of Atlas:

```bash
docker-compose up -d
```

Then update `MONGO_URI` in `.env` to:
```
MONGO_URI=mongodb://localhost:27017/learning
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/users | Register a new user |
| GET | /api/users | Get all users |
| GET | /api/users/admin | Get all users with prompt history |
| GET | /api/categories | Get all categories |
| POST | /api/categories | Create a category |
| GET | /api/subcategories/:categoryId | Get sub-categories by category |
| POST | /api/prompts/ask | Submit a prompt and get AI response |
| GET | /api/prompts/user/:userId | Get learning history for a user |

---

## .env.example

```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/?appName=Cluster0
API_KEY=<your-openai-api-key>
DB_USER=admin
DB_PASSWORD=<your-db-password>
```

---

## Assumptions

- **AI Integration:** Due to API access limitations, the AI service uses a local mock database with predefined responses. The `aiService.js` is structured with a clear interface so it can be swapped with a real OpenAI call by replacing the `generateLearningContent` function.
- **Authentication:** No JWT authentication is implemented in this MVP. User identity is stored in `localStorage` after registration.
- **Frontend Framework:** Angular was used instead of React/Vue as it is a modern production-grade frontend framework that meets the requirements.
- **Database:** MongoDB Atlas is used as the cloud database. Docker Compose is included for local MongoDB as an alternative.
