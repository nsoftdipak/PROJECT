import { Test, TestingModule } from '@nestjs/testing';
import { UserCompanyController } from './user_company.controller';
import { UserCompanyService } from './user_company.service';

describe('UserCompanyController', () => {
  let controller: UserCompanyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCompanyController],
      providers: [UserCompanyService],
    }).compile();

    controller = module.get<UserCompanyController>(UserCompanyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
