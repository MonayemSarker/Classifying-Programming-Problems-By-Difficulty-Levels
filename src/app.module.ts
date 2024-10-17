import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ProblemsModule } from './problems/problems.module';
import { ParticipantsModule } from './participants/participants.module';
import { SurveysModule } from './surveys/surveys.module';

@Module({
  imports: [UsersModule, ConfigModule.forRoot({
    isGlobal: true,
  }), ProblemsModule, ParticipantsModule, SurveysModule,],
  controllers: [],
  providers: [],
})
export class AppModule { }
