import { Module } from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { SurveysController } from './surveys.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule,],
  controllers: [SurveysController],
  providers: [SurveysService],
})
export class SurveysModule { }
