import { AuthorsController, AuthorsService } from '@bookexample/authors';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, AuthorsController],
  providers: [AppService, AuthorsService],
})
export class AppModule {}
