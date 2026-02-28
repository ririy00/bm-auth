# Code Reference

This is a quick map of the main auth code paths.

## Request flow

1. `AuthController` receives HTTP request.
2. Controller calls a use-case (`RegisterUserUseCase` or `LoginUserUseCase`).
3. Use-case depends on domain contracts:
   - `UserRepository`
   - `PasswordHasher`
   - `TokenService`
4. Nest DI resolves those contracts to infrastructure implementations:
   - `PrismaUserRepository`
   - `BcryptPasswordHasher`
   - `JwtTokenService`

## Layered folders

- `src/modules/*`: Nest modules/controllers (delivery layer).
- `src/application/*`: use-cases and application errors.
- `src/domain/*`: entities and abstraction contracts.
- `src/infrastructure/*`: concrete implementations (Prisma, bcrypt, JWT).
- `src/common/*`: shared infra (`PrismaService`, global module wiring).

## Core files

- `src/modules/auth/auth.module.ts`: auth dependency wiring.
- `src/modules/auth/auth.controller.ts`: `/auth/register` and `/auth/login`.
- `src/modules/users/users.module.ts`: exports repository binding.
- `src/application/auth/use-cases/register-user.use-case.ts`: registration logic.
- `src/application/auth/use-cases/login-user.use-case.ts`: login/token logic.
- `src/domain/repositories/user.repository.ts`: repository contract.
- `src/infrastructure/prisma/prisma-user.repository.ts`: Prisma repository.

