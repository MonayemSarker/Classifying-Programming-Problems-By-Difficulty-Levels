import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

@Injectable()
export class AuthUserService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) { }

  async create(userDto: CreateUserDto) {
    const { password } = userDto;
    const hash = await argon2.hash(password);
    userDto.password = hash;
    const newUser = await this.userService.create(userDto);

    const tokens = await this.getTokens(
      newUser.id,
      newUser.email
    );
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);

    return tokens;
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    // console.log(user);

    if (!user) {
      throw new BadRequestException('No user found with this email');
    }

    const passwordMatches = await argon2.verify(user.password, password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return {
      tokens: tokens,
    };
  }

  // TODO: Log out must be completed
  async logout(userId: string) {
    return this.userService.updateToken(userId, null);
  }

  async getTokens(userId: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email: email,
        },
        {
          secret: process.env.JWT_SECRET_KEY,
          expiresIn: '1d',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email: email,
        },
        {
          secret: process.env.JWT_REFRESH_TOKEN,
          expiresIn: '100d',
        },
      ),
    ]);
    return { accessToken, refreshToken };
  }

  async hashData(data: string) {
    return argon2.hash(data);
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.userService.updateToken(userId, hashedRefreshToken);
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userService.findOneById(userId);
    if (!user || !user.refreshToken) {
      throw new BadRequestException('Access denied');
    }

    const refreshTokenMatches = await argon2.verify(user.refreshToken, refreshToken);

    if (!refreshTokenMatches) throw new ForbiddenException('Access denied');
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
}
