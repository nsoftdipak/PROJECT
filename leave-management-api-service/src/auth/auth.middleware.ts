import { Injectable, NestMiddleware, UnauthorizedException, Inject } from '@nestjs/common';
import { Request,  NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    console.log("request comeingkk")
    const token = req.headers['authorization']?.split(' ')[1];
    console.log(token)
    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    try {
      const decoded = this.jwtService.verify(token, {
        secret:'dipakjamdar'
      });
      req['user'] = decoded;
      console.log("valid")

    } catch (err) {
      console.log("Invalid")
      throw new UnauthorizedException('Invalid token');
    }

    next();
  }
}
