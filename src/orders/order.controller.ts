import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-client.dto';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';
import { Request } from 'express';
import { Types } from 'mongoose';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }
  @UseGuards(AccessTokenGuard)
  @Post()
  create(@Body() createClientDto: CreateOrderDto) {
    return this.orderService.create(createClientDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: Request) {
    console.log(req);

    return this.orderService.findOne(id)
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateClientDto) {
  //   return this.orderService.update(+id, updateClientDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.orderService.remove(+id);
  // }
}
