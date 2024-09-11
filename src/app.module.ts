import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ProblemsModule } from './problems/problems.module';

@Module({
  imports: [UsersModule, ConfigModule.forRoot({
    isGlobal: true,
  }), ProblemsModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
