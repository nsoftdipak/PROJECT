import { Test, TestingModule } from '@nestjs/testing';
import { LeaveEncashmentService } from './leave-encashment.service';

describe('LeaveEncashmentService', () => {
  let service: LeaveEncashmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeaveEncashmentService],
    }).compile();

    service = module.get<LeaveEncashmentService>(LeaveEncashmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
