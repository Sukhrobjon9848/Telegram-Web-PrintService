import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import passport from 'passport';
import { AuthModule } from 'src/auth/auth.module';
import { OrderModule } from 'src/orders/order.module';
import { UserModule } from 'src/user/user.module';
import { setThePassword } from 'whatwg-url';


@Module({
  imports: [AuthModule, MongooseModule.forRoot("mongodb://localhost/ServicePrint"),
    ConfigModule.forRoot({
      isGlobal: true,
    }), UserModule, OrderModule],

})
export class AppModule { }
