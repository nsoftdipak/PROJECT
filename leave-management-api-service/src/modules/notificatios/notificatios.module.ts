import { Module } from '@nestjs/common';
import { NotificatiosService } from './notificatios.service';
import { NotificatiosController } from './notificatios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from 'src/shared/entities/notificatio.entity';

@Module({

  imports:[ TypeOrmModule.forFeature([Notification])],
  controllers: [NotificatiosController],
  providers: [NotificatiosService],
  exports:[NotificatiosService],
})
export class NotificatiosModule {}
