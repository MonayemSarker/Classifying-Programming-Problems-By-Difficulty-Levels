import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ObjectId } from 'mongodb';

@Injectable()
export class SurveysService {
  constructor(private prisma: PrismaService) { }

  async create(createSurveyDto: CreateSurveyDto, createdById: string) {
    const { name, problemSet_ids } = createSurveyDto;
    const newSurvey = await this.prisma.surveys.create({
      data: {
        name: name,
        problemSet_ids: problemSet_ids,
        created_by: createdById,
      },
    });

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
