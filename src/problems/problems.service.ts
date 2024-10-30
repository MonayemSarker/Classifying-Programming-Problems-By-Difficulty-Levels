import { Injectable } from '@nestjs/common';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProblemSetDto } from './dto/create-problem-set.dto';
import * as path from 'path';
import * as fs from 'fs';



@Injectable()
export class ProblemsService {
  constructor(private prisma: PrismaService) { }

  saveCodeToFile(problem: any) {
    const filePath = path.join('src', 'problems', 'codes', `${problem.id}.txt`);
    fs.writeFileSync(filePath, problem.code, 'utf8');
  }

  async create(createProblemDto: CreateProblemDto, uploader_user_id: string) {
    console.log(createProblemDto);

    createProblemDto.code = createProblemDto.code.replace(/\\n/g, '\n');
    const problem = await this.prisma.problems.create({
      data: {
        ...createProblemDto,
        uploader_user_id,
        ranked_score: null,
        problemSet_id: null
      },
    });
    await this.saveCodeToFile(problem);
    return problem;
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
      problem.code = problem.code.replace(/\\n/g, '\n');
      const createdProblem = await this.prisma.problems.create({
        data: {
          description: problem.description,
          code: problem.code,
          initial_score: Number(problem.initial_score),
          uploader_user_id,
          ranked_score: null,
          problemSet_id,
        },
      });
      await this.saveCodeToFile(createdProblem);
      return createdProblem;
    })
    );
    // console.log(results);

    return results;
  }

  findAll() {
    return this.prisma.problems.findMany();
  }


  findAllProblemSet() {
    return this.prisma.problemSets.findMany();
  }

  findOne(id: string) {
    return this.prisma.problems.findUnique({
      where: { id }
    });
  }

  // update(id: string, updateProblemDto: UpdateProblemDto) {
  //   return `This action updates a #${id} problem`;
  // }

  remove(id: string) {
    return this.prisma.problems.delete({
      where: { id }
    });;
  }
}
