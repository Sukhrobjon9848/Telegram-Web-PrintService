import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { User } from "src/user/schemas/user.schema";

@Schema({ timestamps: true })
export class Order {
    @Prop({ required: true, type: String })
    title: string
    @Prop({ required: true, type: String })
    number: string
    @Prop({ required: true, type: String })
    price: string
    @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
    client: Types.ObjectId
}
export type OrderDocument = HydratedDocument<Order>

export const OrderSchema = SchemaFactory.createForClass(Order)