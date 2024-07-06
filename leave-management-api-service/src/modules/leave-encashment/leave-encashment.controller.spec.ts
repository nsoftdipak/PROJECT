import { Test, TestingModule } from '@nestjs/testing';
import { LeaveEncashmentController } from './leave-encashment.controller';
import { LeaveEncashmentService } from './leave-encashment.service';

describe('LeaveEncashmentController', () => {
  let controller: LeaveEncashmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeaveEncashmentController],
      providers: [LeaveEncashmentService],
    }).compile();

    controller = module.get<LeaveEncashmentController>(LeaveEncashmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
