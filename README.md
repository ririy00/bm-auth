# BM Monorepo

Turbo + npm workspaces monorepo for BM backend services.

## Structure

```text
apps/
  api-gateway/
  auth-service/
  payment-service/
packages/
  auth-database/
  payment-database/
  shared-types/
  utils/
```

## Database ownership

- `auth-service` owns `packages/auth-database`
- `payment-service` owns `packages/payment-database`
- `api-gateway` is intentionally stateless and does not own domain data

This is the microservice rule in this repo: services do not share one database package.

## Current state

- `apps/auth-service` and `apps/api-gateway` are implemented services.
- `packages/auth-database` contains the live Prisma schema and migrations used by auth.
- `packages/payment-database` is a scaffold for payment's future database.
- `apps/payment-service` is still a service scaffold.
- `packages/shared-types` and `packages/utils` remain shared code packages.

## Install

```bash
npm install
```

## Common commands

```bash
# run the current auth service
npm run dev:auth

# run the api gateway
npm run dev:gateway

# start the api gateway (prod)
npm run start:gateway

# build every workspace that exposes a build script
npm run build

# run unit tests across workspaces
npm run test

# run auth-service e2e tests
npm run test:e2e

# generate Prisma clients
npm run prisma:generate
npm run prisma:generate:auth
npm run prisma:generate:payment

# run service-specific migrations
npm run prisma:migrate:auth
npm run prisma:migrate:payment
```

## Turborepo usage

This repository uses Turbo to orchestrate workspace tasks from the root.

### Root Turbo scripts

```bash
npm run build
npm run dev
npm run lint
npm run test
npm run test:e2e
```

### Target a single workspace

Use npm workspaces when you want one package directly:

```bash
npm run dev --workspace @bm/auth-service
npm run build --workspace @bm/auth-service
npm run test --workspace @bm/auth-service
```

Use Turbo filters when you want Turbo orchestration but only for one target:

```bash
npx turbo run build --filter=@bm/auth-service
npx turbo run test --filter=@bm/auth-service
npx turbo run prisma:generate --filter=@bm/auth-database
```

### Task behavior

- `build` depends on upstream package builds first.
- `dev` is persistent and not cached.
- `test:e2e` runs after `build`.
- Only workspaces that define a script participate in that Turbo run.

## Auth service

Auth-specific documentation lives here:

- `apps/auth-service/README.md`
- `apps/auth-service/docs/auth-module-notes.md`
- `apps/auth-service/docs/code-reference.md`

## Environment

Use service-specific `.env` files. Templates live alongside each app:

- Root infrastructure: `.env.example`
- Auth service: `apps/auth-service/.env.example`
- API gateway: `apps/api-gateway/.env.example`
- Payment service: `apps/payment-service/.env.example`
