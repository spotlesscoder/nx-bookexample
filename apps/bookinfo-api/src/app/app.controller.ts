import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateAutobiographyProcessDto } from './create-autobiography-process-dto';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post('autobiography')
  letAuthorBeBornWriteAndPublishBook(
    @Body() createAutobiographyProcessDto: CreateAutobiographyProcessDto
  ) {
    this.appService.handleCreateAutoBiographyCommand(
      createAutobiographyProcessDto
    );
  }
}
