import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/users/guard/accessToken.guard';
import { Request } from 'express';
import { CreateProblemSetDto } from './dto/create-problem-set.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Express } from 'express';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiBearerAuth()
@ApiTags('Problems')
@Controller('problems')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) { }

  @UseGuards(AccessTokenGuard)
  @Post()
  create(@Body() createProblemDto: CreateProblemDto, @Req() req: Request) {
    return this.problemsService.create(createProblemDto, req.user['sub']);
  }

  @UseGuards(AccessTokenGuard)
  @Post('set')
  createProblemSet(@Body() createProblemSetDto: CreateProblemSetDto, @Req() req: Request) {
    return this.problemsService.createProblemSet(createProblemSetDto, req.user['sub']);
  }

  @UseGuards(AccessTokenGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'CSV file to upload',
    required: true,
    type: 'file'
  })
  @Post('set/:id/upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
      }
    }),
    fileFilter: (req, file, cb) => {
      if (file.mimetype !== 'text/csv') {
        return cb(new Error('Only CSV files are allowed!'), false);
      }
      cb(null, true);
    }
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Param('id') problemSetId: string, @Req() req: Request) {
    // console.log("Problem Set Id", problemSetId);

    const problems = [];
    fs.createReadStream(file.path)
      .pipe(csv())
      .on('data', (data) => problems.push(data))
      .on('end', () => {
        return this.problemsService.bulkUploadToProblemSet(problems, problemSetId, req.user['sub'])
        // console.log(problems);
      });
  }

  @UseGuards(AccessTokenGuard)
  @Get('sets')
  findAllProblemSet() {
    return this.problemsService.findAllProblemSet();
  }

  @UseGuards(AccessTokenGuard)
  // @UseInterceptors(CacheInterceptor)
  @Get()
  findAll() {
    return this.problemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.problemsService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProblemDto: UpdateProblemDto) {
  //   return this.problemsService.update(id, updateProblemDto);
  // }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.problemsService.remove(id);
  }
}
