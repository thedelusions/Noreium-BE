 # Noreium — Backend

This repository contains the Noreium backend (TypeScript + Express + MongoDB).

Quick start

1. Install dependencies:

```bash
npm install
```

2. Set environment variables (example):

```bash
export MONGODB_URI="mongodb://localhost:27017/noreium"
export JWT_SECRET="replace-me-in-prod"
export PORT=3000
```

3. Run dev server:

```bash
npm run dev
```

Build and run:

```bash
npm run build
npm start
```

What I added

- TypeScript project scaffold (`src/`)
- Auth: register/login/me with JWT (`/api/auth`)
- Library items CRUD (`/api/library-items`)
- Collections CRUD and membership (`/api/collections`)
- Generator endpoint to build platform scripts (`/api/generator/script`)
- Central error handler, Zod validation, ESLint/Prettier, and unit tests (Vitest)

Environment variables

- `MONGODB_URI` — MongoDB connection string
- `JWT_SECRET` — JWT signing secret (required for auth)
- `PORT` — HTTP server port (default 3000)
- `APP_ENV` — environment (development/production)

Files of interest

- [src/app.ts](src/app.ts) — Express app and route mounts
- [src/server.ts](src/server.ts) — server bootstrap
- [src/modules/auth](src/modules/auth) — auth module
- [src/modules/library-items](src/modules/library-items) — library items
- [src/modules/collections](src/modules/collections) — collections
- [src/modules/generator](src/modules/generator) — generator service
- [docs/API.md](docs/API.md) — API reference
- [docs/openapi.yaml](docs/openapi.yaml) — OpenAPI spec

Examples

Register a user:

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"me@example.com","password":"secret"}'
```

Login:

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"me@example.com","password":"secret"}'
```

Use the returned `token` as `Authorization: Bearer <token>` for protected routes.

Create a library item (example):

```bash
curl -X POST http://localhost:3000/api/library-items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"type":"TOOL","name":"jq","metadata":{"linuxCommand":"sudo apt install -y jq"}}'
```

Generate a script for a collection (Linux):

```bash
curl -X POST http://localhost:3000/api/generator/script \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"collectionId":"<COLLECTION_ID>","platform":"linux"}'
```

See [docs/API.md](docs/API.md) for full endpoint details and examples.
