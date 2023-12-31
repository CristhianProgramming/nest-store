import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { enviroument } from 'env/env';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersMiddleware implements NestMiddleware {
  use(req: Request, res: any, next: () => void) {
    const token = req.headers['x-access-token'];
    if (token === undefined)
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'not found token in request' });

    try {
      const tokenDecode: any = jwt.verify(
        token as string,
        enviroument.SECRET_KEY,
      );
      if (tokenDecode.exp < (new Date().getTime() + 1) / 1000)
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'token is expired' });
      req.body.id_token = tokenDecode.id;
      next();
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'token is invalid' });
    }
  }
}
