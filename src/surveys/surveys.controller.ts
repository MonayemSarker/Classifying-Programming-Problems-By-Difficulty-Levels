import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { Request } from 'express';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/users/guard/accessToken.guard';
import { FilterSurveyDto } from './dto/filter-survey.dto';

@ApiTags('Surveys')
@ApiBearerAuth()
@Controller('surveys')
@UseGuards(AccessTokenGuard)
export class SurveysController {
  constructor(private readonly surveysService: SurveysService) { }

  @ApiOperation({ summary: 'Create a new survey' })
  @Post()
  create(@Body() createSurveyDto: CreateSurveyDto, @Req() req: Request) {
    return this.surveysService.create(createSurveyDto, req.user['sub']);
  }

  @Get()
  findAll(@Query() filterDto: FilterSurveyDto) {
    return this.surveysService.findAll(filterDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.surveysService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSurveyDto: UpdateSurveyDto) {
  //   return this.surveysService.update(+id, updateSurveyDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.surveysService.remove(id);
  }
}
