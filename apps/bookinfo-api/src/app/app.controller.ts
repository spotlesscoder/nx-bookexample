import { AuthService } from '@bookexample/auth';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { CreateAutobiographyProcessDto } from './create-autobiography-process-dto';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
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
