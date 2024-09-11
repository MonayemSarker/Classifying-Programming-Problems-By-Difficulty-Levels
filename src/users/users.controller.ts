import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthUserService } from './auth-user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Request } from 'express';
import { AccessTokenGuard } from './guard/accessToken.guard';

@ApiTags('User')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly authService: AuthUserService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() {email, password}: LoginUserDto){
    return this.authService.login(email, password);
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(id);
  }

  @UseGuards(AccessTokenGuard)
  @Put('logout')
  logout(@Req() req: Request) {
    // console.log("User details",req.user);
    this.authService.logout(req.user['sub']);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('')
  update(@Body() updateUserDto: UpdateUserDto, @Req() req: Request) {
    return this.usersService.update(req.user['sub'], updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
