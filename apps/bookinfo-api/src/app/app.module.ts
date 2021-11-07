import { AuthorsController, AuthorsService } from '@bookexample/authors';
import { BooksController, BooksService } from '@bookexample/books';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksOfAuthorsService } from './books-of-authors.service';

@Module({
  imports: [],
  controllers: [AppController, AuthorsController, BooksController],
  providers: [AppService, AuthorsService, BooksService, BooksOfAuthorsService],
})
export class AppModule {}
