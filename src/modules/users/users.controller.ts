import {
  BadRequestException,
  Controller,
  DefaultValuePipe,
  Get,
  NotFoundException,
  ParseIntPipe,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { GetCurrentUserUseCase } from '../../application/user/use-cases/get-current-user.use-case';
import { InvalidPageError } from '../../application/user/errors/invalid-page.error';
import { UserNotFoundError } from '../../application/user/errors/user-not-found.error';
import { GetUsersUseCase } from '../../application/user/use-cases/get-users.use-case';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

type AuthenticatedRequest = Request & {
  user: {
    id: string;
    email: string;
  };
};

@Controller('users')
export class UsersController {
  constructor(
    private readonly getCurrentUser: GetCurrentUserUseCase,
    private readonly getUsers: GetUsersUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async list(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    try {
      return await this.getUsers.execute(page);
    } catch (error) {
      if (error instanceof InvalidPageError) {
        throw new BadRequestException(error.message);
      }

      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req: AuthenticatedRequest) {
    try {
      return await this.getCurrentUser.execute(req.user.id);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        throw new NotFoundException('User not found');
      }

      throw error;
    }
  }
}
