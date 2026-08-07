# 🍴 RecipeHub — Recipe Sharing Platform

A full-stack MERN recipe-sharing web app built for the **Web Development (Level 5)** coursework. Users can browse recipes, filter and search by cuisine/difficulty/time, post their own recipes, bookmark favourites, and use the built-in **Gemini AI "What Can I Cook?"** generator that suggests recipes from available ingredients.

## 🔗 Live URLs

- **Backend API (Render):** https://recipe-sharing-shzs.onrender.com
- **Health check:** https://recipe-sharing-shzs.onrender.com/health
- **Frontend:** deployed separately (add your Netlify/Render static URL here)

## ✨ Features

| Week | Feature |
| --- | --- |
| 1 | React + Vite + Tailwind setup; RecipeCard, RecipeGrid, difficulty badges, navigation |
| 2 | State-driven recipes; dynamic add form (ingredients + steps), detail view, delete, live search, dashboard stats |
| 3 | Express REST API (CRUD) tested in Postman |
| 4 | MongoDB Atlas + Mongoose persistence; cuisine filter and text search |
| 5 | JWT + bcrypt auth; protected routes; favourites/bookmarks per user; "Posted by" on cards |
| 6 | Deployed to Render/Netlify with env vars, SPA redirects, GitHub Actions CI |
| 7 | Gemini AI recipe generator — "What Can I Cook?" with save-to-RecipeBox |

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS, React Router, Axios
- **Backend:** Node.js, Express, Mongoose, JWT, bcrypt, `@google/genai` (Gemini 3.6 Flash)
- **Database:** MongoDB Atlas
- **CI/CD:** GitHub Actions, Render (backend), Netlify (frontend)

## 📁 Project Structure

```
Backend/            Express + Mongoose REST API (deployed to Render)
Frontend/           React + Vite SPA (deployed to Netlify)
.github/workflows/  CI pipeline (lint + build on every push)
```

## 🚀 Getting Started

### Backend

```bash
cd Backend
npm install
cp .env.example .env   # or create .env with the values below
npm start              # runs node app.js on port 3001
```

`.env` variables:

```
PORT=3001
MONGODB_URI=mongodb+srv://...
JWT_SECRET=...
FRONTEND_URL=...
GEMINI_API_KEY=...
NODE_ENV=dev
```

### Frontend

```bash
cd Frontend
npm install
cp .env.example .env
npm run dev            # starts Vite dev server
```

`.env` variable:

```
VITE_API_URL=https://recipe-sharing-shzs.onrender.com
```

## 🔌 API Endpoints

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/api/recipes` | – | List recipes (`?cuisine=`, `?search=`) |
| GET | `/api/recipes/:id` | ✅ | Single recipe detail |
| POST | `/api/recipes` | ✅ | Create a recipe |
| PUT | `/api/recipes/:id` | ✅ | Update a recipe (owner only) |
| DELETE | `/api/recipes/:id` | ✅ | Delete a recipe (owner only) |
| POST | `/api/auth/register` | – | Create account |
| POST | `/api/auth/login` | – | Log in |
| GET | `/api/auth/me` | ✅ | Current user |
| GET | `/api/auth/bookmarks` | ✅ | User's bookmarked recipes |
| POST | `/api/auth/bookmarks/toggle` | ✅ | Add/remove a bookmark |
| POST | `/ai/recipe-recommend` | – | Gemini AI recipe recommendation |
| GET | `/health` | – | Server health check |

## 📸 Screenshots

_Add your screenshots here_ (home page, recipe detail, AI generator, login, My Recipes).

## ✅ CI/CD

GitHub Actions runs ESLint and a production build on every push to `main`/`developer` (see `.github/workflows/ci.yml`). The backend auto-deploys to Render on push to `main`.
