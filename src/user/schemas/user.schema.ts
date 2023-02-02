import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true, type: String, length: [3, 21] })
    userName: string
    @Prop({ required: true, unique: true })
    email: string
    @Prop({ required: true, type: String, length: [8, 87] })
    password: string
    @Prop({ default: 'kk',defaultOptions:true})
    refreshToken: string

}

export type UserDocument = HydratedDocument<User>
export const AuthSchema = SchemaFactory.createForClass(User)