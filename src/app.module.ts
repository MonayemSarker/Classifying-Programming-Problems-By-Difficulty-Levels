import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ProblemsModule } from './problems/problems.module';
import { ParticipantsModule } from './participants/participants.module';

@Module({
  imports: [UsersModule, ConfigModule.forRoot({
    isGlobal: true,
  }), ProblemsModule, ParticipantsModule,],
  controllers: [],
  providers: [],
})
export class AppModule { }
