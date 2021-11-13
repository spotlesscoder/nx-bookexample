import { Body, Controller, Get, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { BooksOfAuthorsDto } from './books-of-authors-dto';
import { BooksOfAuthorsMapper } from './books-of-authors-mapper';
import { CreateAutobiographyProcessDto } from './create-autobiography-process-dto';
import util = require('util');

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @UseGuards(JwtAuthGuard)
  @Post('autobiography')
  public async letAuthorBeBornWriteAndPublishBook(@Body(new ValidationPipe({ transform: true })) createAutobiographyProcessDto: CreateAutobiographyProcessDto, @Request() req): Promise<BooksOfAuthorsDto[]> {
    const result: BooksOfAuthorsDto[] = [];

    const serviceResult = await this.appService.handleCreateAutoBiographyCommand(createAutobiographyProcessDto, req.user);

    serviceResult.forEach((item) => {
      result.push(BooksOfAuthorsMapper.toDto(item));
    });

    return result;
  }
}
