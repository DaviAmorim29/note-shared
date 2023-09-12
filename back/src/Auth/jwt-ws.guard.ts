import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class JwtWsGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const client = context.switchToWs().getClient();
    const token = client.handshake.query.token;

    try {
      const decoded = this.jwtService.verify(token);
      context.switchToWs().getData().user = decoded;
      return true;
    } catch (err) {
      throw new WsException('Invalid token');
    }
  }
}
