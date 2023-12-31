import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UtilsService } from './utils/utils.service';
import { ProductoModule } from './producto/producto.module';
import { AuthModule } from './auth/auth.module';
import { UsersMiddleware } from './users/middleware/authenticated/users.middleware';
import { AdminMiddleware } from './users/middleware/typesUser/admin.middleware';
import { EditMiddleware } from './users/middleware/typesUser/edit.middleware';

@Module({
  imports: [UsersModule, ProductoModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, UtilsService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {

    consumer.apply(UsersMiddleware)
      .forRoutes(
        { path: 'producto', method: RequestMethod.GET },
      )

    consumer
      .apply(UsersMiddleware, EditMiddleware)
      .forRoutes(
        { path: 'users', method: RequestMethod.GET },
        { path: 'users', method: RequestMethod.PUT },
      );

    consumer
      .apply(UsersMiddleware, AdminMiddleware)
      .forRoutes(
        { path: 'users', method: RequestMethod.POST },
        { path: 'users', method: RequestMethod.DELETE },
      );


    consumer.apply(UsersMiddleware, EditMiddleware)
      .forRoutes(
        { path: 'producto', method: RequestMethod.POST },
        { path: 'producto', method: RequestMethod.PUT },
        { path: 'producto', method: RequestMethod.DELETE }
      )
  }
}
