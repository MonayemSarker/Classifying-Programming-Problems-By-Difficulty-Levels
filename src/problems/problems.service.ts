import { Injectable } from '@nestjs/common';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProblemSetDto } from './dto/create-problem-set.dto';



@Injectable()
export class ProblemsService {
  constructor(private prisma: PrismaService) { }

  create(createProblemDto: CreateProblemDto, uploader_user_id: string) {
    return this.prisma.problems.create({
      data: {
        ...createProblemDto,
        uploader_user_id,
        ranked_score: null,
        problemSet_id: null
      },
    });
  }

  createProblemSet(createProblemSetDto: CreateProblemSetDto, uploader_user_id: string) {
    return this.prisma.problemSets.create({
      data: {
        ...createProblemSetDto,
        uploader_user_id
      }
    });
  }

  async bulkUploadToProblemSet(problems: any[], problemSet_id: string, uploader_user_id) {
    const results = await Promise.all(problems.map(async (problem) => {
      return await this.prisma.problems.create({
        data: {
          description: problem.description,
          code: problem.code,
          initial_score: Number(problem.initial_score),
          uploader_user_id,
          ranked_score: null,
          problemSet_id,
        },
      });
    })
    );
    console.log(results);

    return results;
  }

  findAll() {
    return `This action returns all problems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} problem`;
  }

  update(id: number, updateProblemDto: UpdateProblemDto) {
    return `This action updates a #${id} problem`;
  }

  remove(id: number) {
    return `This action removes a #${id} problem`;
  }
}
