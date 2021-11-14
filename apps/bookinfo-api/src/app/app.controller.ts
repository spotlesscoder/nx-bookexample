import { BooksOfAuthors } from '.prisma/client';
import { Body, Controller, Get, HttpException, HttpStatus, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { BooksOfAuthorsDto } from './books-of-authors-dto';
import { BooksOfAuthorsMapper } from './books-of-authors-mapper';
import { CreateAutobiographyProcessDto } from './create-autobiography-process-dto';
import { InvalidBirthAndWriteStartRangeException } from './invalid-birth-and-write-start-range';

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
    let serviceResult = null;
    try {
      serviceResult = await this.appService.handleCreateAutoBiographyCommand(createAutobiographyProcessDto, req.user);
    } catch (ex) {
      if (ex instanceof InvalidBirthAndWriteStartRangeException) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: ex.message,
          },
          HttpStatus.BAD_REQUEST
        );
      }

      throw ex;
    }

    //BOs to DTOs
    const result: BooksOfAuthorsDto[] = [];
    serviceResult.forEach((item: BooksOfAuthors) => {
      result.push(BooksOfAuthorsMapper.toDto(item));
    });

    return result;
  }
}
