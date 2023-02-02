import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
  }
  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto)
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: string) {
    return this.userModel.findOne({ id })
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email })
  }
  async update(id: string, updateData: any) {

    return await this.userModel.findByIdAndUpdate(id, updateData)
  }

  // remove(id: number) {
  //   return this.userModel.findOneAndDelete({ id })
  // }
}
