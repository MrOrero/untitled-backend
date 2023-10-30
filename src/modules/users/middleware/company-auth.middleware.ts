import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class CompanyAuthMiddleware implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authorizationHeader = request.headers['authorization'];

    if (!authorizationHeader) {
      throw new UnauthorizedException('Unauthorized');
    }

    const [tokenType, token] = authorizationHeader.split(' ');

    if (tokenType !== 'Bearer' || !token) {
      throw new UnauthorizedException('Unauthorized');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
        type: string;
      };

      if (typeof decoded === 'string') {
        throw new UnauthorizedException('Unauthorized');
      }

      if (decoded.type === 'COMPANY') {
        (request as any).user = decoded;
        return true;
      }
    } catch (error) {
      throw new UnauthorizedException('Unauthorized');
    }

    throw new UnauthorizedException('Unauthorized');
  }
}
