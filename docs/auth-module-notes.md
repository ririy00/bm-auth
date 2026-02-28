# Auth Module Notes

This document explains the NestJS concepts used in this project around auth and users.

## `AuthModule` (`src/modules/auth/auth.module.ts`)

- `imports`: brings in other modules needed by auth.
  - `PrismaModule`: provides `PrismaService`.
  - `UsersModule`: exports `UserRepository` binding.
  - `JwtModule.register(...)`: configures JWT signing (secret and expiration).
- `providers`: classes Nest can create and inject.
  - `RegisterUserUseCase`, `LoginUserUseCase`
  - `PasswordHasher -> BcryptPasswordHasher`
  - `TokenService -> JwtTokenService`
- `controllers`: route handlers for this module.
  - `AuthController` exposes `/auth/register` and `/auth/login`.

## `UsersModule` (`src/modules/users/users.module.ts`)

`UsersModule` is internal wiring for user persistence:

- It binds `UserRepository` to `PrismaUserRepository`.
- It exports `UserRepository` so other modules can inject it.
- It does not need a controller unless you want user endpoints such as:
  - `GET /users/me`
  - profile update
  - user admin management

For an auth-only service, no `UsersController` is required.

## `@Injectable()`

`@Injectable()` marks a class as a Nest provider.  
Nest can then:

- instantiate it
- resolve constructor dependencies
- inject it into other providers/controllers

Without it, dependency injection for that class usually does not work as expected.

## `@Global()`

`@Global()` makes a module available application-wide after it is imported once.

In this project, `PrismaModule` is global, so `PrismaService` can be injected across modules without repeatedly importing `PrismaModule`.

Use global modules for shared infrastructure (database, config, logger), but keep usage limited so dependencies stay clear.
