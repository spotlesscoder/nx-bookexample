import { User, UsersService } from '@bookexample/users';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  const usersServiceMock = {
    async findOne(email: string): Promise<User | undefined> {
      return {
        id: 1,
        email: 'john',
        password: 'changeme',
      };
    },
  };

  const jwtServiceMock = {};

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AuthService, UsersService, JwtService],
    })
      .overrideProvider(UsersService)
      .useValue(usersServiceMock)
      .overrideProvider(JwtService)
      .useValue(jwtServiceMock)
      .compile();

    service = module.get(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
