# IoT Asset Dashboard

A full-stack asset-management dashboard for monitoring connected hardware. Authenticated users can register, search, filter, update, and remove assets through a responsive React interface backed by an Express and MongoDB API.

## Highlights

- JWT-protected asset API with user registration and sign-in
- Server-side pagination, status filtering, and case-insensitive search
- CRUD workflows for asset metadata, alarms, tags, and location data
- Clear local configuration through committed environment templates; no secrets are tracked

## Stack

- **Frontend:** React, Vite, React Router, Axios
- **Backend:** Node.js, Express, Mongoose, JSON Web Tokens
- **Database:** MongoDB

## Repository layout

```
frontend/   React single-page application
backend/    Express API and MongoDB models
```

## Run locally

Prerequisites: Node.js 20+, npm, and a local or hosted MongoDB instance.

1. Create local environment files from the templates:

   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```

2. Set `MONGO_URI` and a long, random `JWT_SECRET` in `backend/.env`.

3. Install and start the API:

   ```bash
   cd backend
   npm ci
   npm run dev
   ```

4. In a second terminal, install and start the client:

   ```bash
   cd frontend
   npm ci
   npm run dev
   ```

The client runs on `http://localhost:5173` and talks to the API at `http://localhost:5000/api` by default.

## Useful commands

```bash
# Seed example assets (this replaces the current asset collection)
cd backend && node seedAssets.js

# Check the frontend
cd frontend && npm run lint && npm run build
```

## Security notes

Environment files are intentionally excluded from Git. If an environment file was previously committed, rotate any credentials it contained before deployment.

## License

[MIT](LICENSE)
