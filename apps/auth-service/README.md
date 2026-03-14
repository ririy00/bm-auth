# Auth Service

NestJS authentication service for the BM platform.

## Responsibilities

- User registration
- User login
- Password hashing with `bcrypt`
- JWT access and refresh token flows
- User lookup endpoints

## Key paths

```text
src/
  common/prisma/
  modules/auth/
  modules/users/
../../packages/auth-database/prisma/
```

## Local run

From the repository root:

```bash
npm install
docker compose up auth-postgres pgadmin
npm run prisma:generate:auth
npm run dev:auth
```

The service starts on `http://localhost:3000`.

## Notes

- Auth data lives in `../../packages/auth-database`.
- The service expects `AUTH_DATABASE_URL` and falls back to `DATABASE_URL`.
- Module notes are in `docs/auth-module-notes.md`.
- Code reference notes are in `docs/code-reference.md`.
