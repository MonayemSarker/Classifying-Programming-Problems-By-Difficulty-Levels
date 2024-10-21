import { Module } from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { SurveysController } from './surveys.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ParticipantsModule } from 'src/participants/participants.module';
import { ParticipantsService } from 'src/participants/participants.service';
import { MailService } from './mail.service';
import { SurveyDetailService } from './survey-details.service';

@Module({
  imports: [PrismaModule, ParticipantsModule],
  controllers: [SurveysController],
  providers: [SurveysService, ParticipantsService, MailService, SurveyDetailService],
})
export class SurveysModule { }
