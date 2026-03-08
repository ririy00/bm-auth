<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# BM Auth Service 🔐

A standalone Authentication Microservice built with:

- NestJS
- Prisma ORM
- PostgreSQL
- JWT
- Docker

This service handles:

- User registration
- User login
- Password hashing (bcrypt)
- JWT access token generation
- Containerized database setup

---

# 🏗 Architecture Overview

BM Auth is designed as a modular authentication service that can be used by other backend services in a microservice architecture.

Detailed NestJS module notes are available in `docs/auth-module-notes.md`.
Code-level flow/reference is available in `docs/code-reference.md`.

Tech stack:

- NestJS (modular architecture)
- Prisma ORM
- PostgreSQL
- Docker (for DB + full containerized setup)

---

# 📁 Project Structure

```
src/
 ├── common/
 │   └── prisma/
 ├── modules/
 │   ├── auth/
 │   └── users/
 ├── app.module.ts
 └── main.ts

prisma/
 └── schema.prisma
```

---

# ⚙️ Environment Variables

Create a `.env` file in the root directory.

## Local Development (.env)

```
DATABASE_URL="postgresql://riri:YOUR_PASSWORD@localhost:5432/bm_auth?schema=public"
JWT_SECRET="supersecretkey"
```

## Docker Environment

Inside Docker, the DB host is the service name:

```
DATABASE_URL="postgresql://riri:YOUR_PASSWORD@postgres:5432/bm_auth?schema=public"
```

⚠️ Never commit real credentials to GitHub.

---

# 🗄 Database Setup (Prisma)

## Install Prisma dependencies

```
npm install @prisma/client
npm install -D prisma
```

## Generate Prisma client

```
npx prisma generate
```

## Run migration

```
npx prisma migrate dev --name init
```

---

# 🚀 Running the Project

## 1️⃣ Local Development (Recommended)

Start only the database using Docker:

```
docker compose up postgres pgadmin
```

Then run the Nest app locally:

```
npm install
npm run start:dev
```

App will run at:

```
http://localhost:3000
```

---

## 2️⃣ Full Docker Mode (App + DB)

Build and start everything:

```
docker compose up --build
```

Services started:

- Auth API → http://localhost:3000
- PostgreSQL → localhost:5432
- pgAdmin → http://localhost:5050

Note:
The app may restart once during startup because PostgreSQL needs time to initialize. This is normal.

---

# 🔐 API Usage

Base URL:

```
http://localhost:3000
```

## 1) Register a user

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456"}'
```

Expected response (shape):

```json
{
  "id": "USER_ID",
  "email": "test@test.com",
  "role": "USER",
  "createdAt": "2026-02-28T21:00:00.000Z",
  "updatedAt": "2026-02-28T21:00:00.000Z"
}
```

## 2) Login and get access token

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456"}'
```

Expected response (shape):

```json
{
  "access_token": "JWT_TOKEN",
  "refresh_token": "REFRESH_TOKEN"
}
```

## 3) Refresh tokens

```bash
REFRESH_TOKEN="REFRESH_TOKEN"
curl -X POST http://localhost:3000/auth/refresh \
  -H "Content-Type: application/json" \
  -d "{\"refresh_token\":\"$REFRESH_TOKEN\"}"
```

Expected response (shape):

```json
{
  "access_token": "NEW_JWT_TOKEN",
  "refresh_token": "NEW_REFRESH_TOKEN"
}
```

## 4) Call protected endpoint (`/users/me`)

Use the token from login:

```bash
TOKEN="JWT_TOKEN"
curl http://localhost:3000/users/me \
  -H "Authorization: Bearer $TOKEN"
```

Expected response (shape):

```json
{
  "id": "USER_ID",
  "email": "test@test.com",
  "role": "USER",
  "createdAt": "2026-02-28T21:00:00.000Z",
  "updatedAt": "2026-02-28T21:00:00.000Z"
}
```

## Endpoint summary

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `GET /users/me` (requires Bearer token)

---

# 🧪 Useful Commands

## Start Dev Mode

```
npm run start:dev
```

## Build Project

```
npm run build
```

## Run Production Build

```
npm run start:prod
```

## Stop Docker

```
docker compose down
```

---

# 🔁 GitHub CI/CD

This repo now includes GitHub Actions workflows:

- `CI` (`.github/workflows/ci.yml`)
  - Trigger: pull requests + pushes to `main`, `master`, `develop`
  - Runs: install, `prisma generate`, tests, build

- `CD` (`.github/workflows/cd.yml`)
  - Trigger: pushes to `main`, tags like `v1.0.0`, or manual dispatch
  - Builds and pushes Docker image to GHCR:
    - `ghcr.io/<owner>/<repo>`
    - tags include branch, tag, commit SHA, and `latest` on default branch

No extra secret is needed for GHCR publish in the same repo; it uses `GITHUB_TOKEN` with `packages: write` permission.

---

# 🐳 Docker Notes

- `postgres` is used as the hostname inside containers.
- `localhost` is used when running Nest locally.
- Use `--no-cache` when rebuilding if changes are not reflected:

```
docker compose up --build --no-cache
```

---

# 🔮 Future Improvements

- Refresh token revocation/logout endpoint
- Role-based authorization (RBAC)
- Swagger documentation
- Redis integration
- Health checks
- CI/CD pipeline

---

# 📌 Development Workflow Summary

1. Run PostgreSQL via Docker
2. Run Nest locally with `npm run start:dev`
3. Use Prisma for migrations
4. Test endpoints with Postman or curl

---

Built as a production-ready authentication microservice.
