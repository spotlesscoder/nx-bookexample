import { Test } from '@nestjs/testing';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';

describe('AuthorsController', () => {
  let controller: AuthorsController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AuthorsService],
      controllers: [AuthorsController],
    }).compile();

    controller = module.get(AuthorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
