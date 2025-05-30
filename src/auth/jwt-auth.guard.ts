import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { UserPayload } from './interfaces/user-payload.interface';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const authHeader = req.headers['authorization'];

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or malformed JWT');
    }

    const token = authHeader.split(' ')[1];

    try {
      const payload = await this.jwtService.verifyAsync<UserPayload>(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      const user = await this.usersService.findByID(payload.sub);
      if (!user) throw new UnauthorizedException('User no longer exists');

      req.user = user;

      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired JWT');
    }
  }
}
