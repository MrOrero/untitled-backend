import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class EmployeeAuthMiddleware implements CanActivate {
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
        role: string;
      };

      if (decoded.type === 'EMPLOYEE' && decoded.role === 'ADMIN') {
        return true;
      }
    } catch (error) {
      throw new UnauthorizedException('You are not authorized');
    }
  }
}
