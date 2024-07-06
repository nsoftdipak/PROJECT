import { Test, TestingModule } from '@nestjs/testing';
import { LeaveRequestSettingController } from './leave-request-setting.controller';
import { LeaveRequestSettingService } from './leave-request-setting.service';

describe('LeaveRequestSettingController', () => {
  let controller: LeaveRequestSettingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeaveRequestSettingController],
      providers: [LeaveRequestSettingService],
    }).compile();

    controller = module.get<LeaveRequestSettingController>(LeaveRequestSettingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
