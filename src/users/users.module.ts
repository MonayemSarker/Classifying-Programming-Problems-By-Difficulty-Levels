import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthUserService } from './auth-user.service';
import { AccessTokenStrategy } from './strategy/accessToken.strategy';
import { RefreshTokenStrategy } from './strategy/refreshToken.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[PrismaModule, JwtModule.register({}),],
  controllers: [UsersController],
  providers: [UsersService, AuthUserService, AccessTokenStrategy, RefreshTokenStrategy ],
})
export class UsersModule {}
