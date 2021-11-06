import { AuthorsController, AuthorsService } from '@bookexample/authors';
import { BooksController, BooksService } from '@bookexample/books';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, AuthorsController, BooksController],
  providers: [AppService, AuthorsService, BooksService],
})
export class AppModule {}
