import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ObjectId } from 'mongodb';
import { ParticipantsService } from 'src/participants/participants.service';
import { CreateEmailDto } from './dto/create-email.dto';
import { MailService } from './mail.service';
import { v4 as uuidv4 } from 'uuid';
import { SurveyDetailService } from './survey-details.service';

@Injectable()
export class SurveysService {
  constructor(
    private prisma: PrismaService,
    private participantsService: ParticipantsService,
    private mailService: MailService,
    private surveyDetailService: SurveyDetailService
  ) { }

  async create(createSurveyDto: CreateSurveyDto, createdById: string) {
    const { name, problemSet_ids } = createSurveyDto;
    const newSurvey = await this.prisma.surveys.create({
      data: {
        name: name,
        problemSet_ids: problemSet_ids,
        created_by: createdById,
      },
    });

    //after the survey has been created, surveyParticipants will be updated accordingly
    if (newSurvey) {
      const participants = await this.participantsService.findAll();

      const problems = await this.prisma.problems.findMany({
        where: {
          problemSet_id: {
            in: problemSet_ids,
          },
        },
      });

      participants.forEach(async participant => {
        const surveyCode = uuidv4();

        const surveyParticipant = await this.prisma.surveyParticipants.create({
          data: {
            survey_id: newSurvey.id,
            participant_id: participant.id,
            survey_code: surveyCode
          }
        })
        if (surveyParticipant) {
          const emailDto: CreateEmailDto = {
            to: participant.email,
            surveyCode: surveyCode
          }

          await this.surveyDetailService.createSurveyDetails(surveyParticipant.id, problems);
          await this.mailService.sendEmail(emailDto);
        }

      })

    }

    return newSurvey;
  }

  async findAll() {
    const surveys = await this.prisma.surveys.findMany()
    return surveys;
  }

  async findOne(id: string) {
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid ID format');
    }
    const survey = await this.prisma.surveys.findUnique({
      where: { id },
    });
    if (!survey) {
      throw new NotFoundException('No survey found');
    }
    return survey;
  }

  // update(id: number, updateSurveyDto: UpdateSurveyDto) {
  //   return `This action updates a #${id} survey`;
  // }

  remove(id: string) {
    return this.prisma.surveys.delete({
      where: { id: id },
    });
  }
}
