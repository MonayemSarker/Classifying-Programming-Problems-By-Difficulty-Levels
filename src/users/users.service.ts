import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return this.prisma.users.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return this.prisma.users.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOneById(id: string) {
    return this.prisma.users.findUnique({
      where: { id: id },
    });
  }

  async findByEmail(email: string){
    return this.prisma.users.findUnique({
      where: {email: email}
    })
  }

  async updateToken(id: string, refreshToken: string){
    return this.prisma.users.update({
      where: {id: id},
      data: { refreshToken: refreshToken },
    })
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.users.update({
      where: { id: id },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    return this.prisma.users.delete({
      where: { id: id },
    });
  }
}
