import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/users/guard/accessToken.guard';
import { Request } from 'express';
import { CreateProblemSetDto } from './dto/create-problem-set.dto';

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

  @Get()
  findAll() {
    return this.problemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.problemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProblemDto: UpdateProblemDto) {
    return this.problemsService.update(+id, updateProblemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.problemsService.remove(+id);
  }
}
