import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }])]
})
export class OrderModule { }
