import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class CompanyAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization');

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded && decoded['company']) {
        // Extract companyId from the token and set it in the request object
        req['companyID'] = decoded['company'];
        next();
      } else {
        throw new UnauthorizedException('Not a company');
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
