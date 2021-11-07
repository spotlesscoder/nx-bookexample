import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
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
  letAuthorBeBornWriteAndPublishBook(
    @Body() createAutobiographyProcessDto: CreateAutobiographyProcessDto,
    @Request() req
  ) {
    this.appService.handleCreateAutoBiographyCommand(
      createAutobiographyProcessDto,
      req.user
    );
  }
}
