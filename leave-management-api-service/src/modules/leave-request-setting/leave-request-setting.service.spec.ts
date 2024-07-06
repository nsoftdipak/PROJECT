import { Test, TestingModule } from '@nestjs/testing';
import { LeaveRequestSettingService } from './leave-request-setting.service';

describe('LeaveRequestSettingService', () => {
  let service: LeaveRequestSettingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeaveRequestSettingService],
    }).compile();

    service = module.get<LeaveRequestSettingService>(LeaveRequestSettingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
