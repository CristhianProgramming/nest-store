import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  constructor(private readonly userServices: UsersService) {}

  async use(req: any, res: any, next: () => void) {
    try {
      const user: any = await this.userServices.findUser(req.body.id_token);
      if (!user.role.map((r) => r.name).includes('admin'))
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: 'user is not authorized' });
      next();
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'token is invalid' });
    }
  }
}
