import { Body, Controller, Get, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { BooksOfAuthorsDto } from './books-of-authors-dto';
import { CreateAutobiographyProcessDto } from './create-autobiography-process-dto';
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
    return this.appService.handleCreateAutoBiographyCommand(createAutobiographyProcessDto, req.user);
  }
}
