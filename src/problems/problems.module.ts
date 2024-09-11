import { Module } from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { ProblemsController } from './problems.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [PrismaModule, MulterModule.register({ dest: './uploads' })],
  controllers: [ProblemsController],
  providers: [ProblemsService],
})
export class ProblemsModule { }
