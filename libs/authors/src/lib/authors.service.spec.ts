import { Test } from '@nestjs/testing';
import { AuthorsService } from './authors.service';

describe('AuthorsService', () => {
  let service: AuthorsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AuthorsService],
    }).compile();

    service = module.get(AuthorsService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
