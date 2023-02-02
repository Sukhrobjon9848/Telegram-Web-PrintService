import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateOrderDto } from './dto/create-client.dto';
import { Order, OrderDocument } from './schemas/order.schema';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {
  }
  async create(createClientDto: CreateOrderDto) {
    const { client, ...data } = createClientDto
    console.log(createClientDto);

    let user = new Types.ObjectId(client)
    return await this.orderModel.create({ ...data, client: user })
  }
  async findAll() {
    return await this.orderModel.find({}).populate('client', { password: 0 })
  }

  findOne(id: string) {
    return this.orderModel.findById(id)
  }

  update(id: number, updateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
