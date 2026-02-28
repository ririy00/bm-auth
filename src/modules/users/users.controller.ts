import {
  Controller,
  Get,
  NotFoundException,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { toAuthUserView } from '../../application/auth/dto/auth-user.view';
import { UserRepository } from '../../domain/repositories/user.repository';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

type AuthenticatedRequest = Request & {
  user: {
    id: string;
    email: string;
  };
};

@Controller('users')
export class UsersController {
  constructor(private readonly userRepository: UserRepository) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req: AuthenticatedRequest) {
    const user = await this.userRepository.findById(req.user.id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return toAuthUserView(user);
  }
}
