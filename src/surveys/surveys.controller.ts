import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { Request } from 'express';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/users/guard/accessToken.guard';
import { FilterSurveyDto } from './dto/filter-survey.dto';
import { ValidateSurveyDto } from './dto/validate-survey.dto';
import { UpdateDifficultyDto } from './dto/update-difficulty.dto';
import { SurveyDetailService } from './survey-details.service';

@ApiTags('Surveys')
@ApiBearerAuth()
@Controller('surveys')
export class SurveysController {
  constructor(private readonly surveysService: SurveysService, private readonly surveyDetailService: SurveyDetailService) { }

  @UseGuards(AccessTokenGuard)
  @ApiOperation({ summary: 'Create a new survey' })
  @Post()
  create(@Body() createSurveyDto: CreateSurveyDto, @Req() req: Request) {
    return this.surveysService.create(createSurveyDto, req.user['sub']);
  }

  @Post('validate')
  async validateSurvey(@Body() validateSurveyDto: ValidateSurveyDto) {
    return await this.surveysService.validateSurvey(validateSurveyDto);
  }

  @Post('update-difficulty')
  async updateDifficulty(@Body() updateDifficultyDto: UpdateDifficultyDto) {
    return await this.surveyDetailService.updateDifficulty(updateDifficultyDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  findAll(@Query() filterDto: FilterSurveyDto) {
    return this.surveysService.findAll(filterDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.surveysService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSurveyDto: UpdateSurveyDto) {
  //   return this.surveysService.update(+id, updateSurveyDto);
  // }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.surveysService.remove(id);
  }
}
