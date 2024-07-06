import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/modules/users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/shared/entities/user.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    HttpModule,
    JwtModule.register({
      secret: 'dipakjamdar', // You should use a more secure way to store your secret
      signOptions: { expiresIn: '60m' },
    }),
    TypeOrmModule.forFeature([User])
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
