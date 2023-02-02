import { IsMongoId, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOrderDto {
    @IsNotEmpty()
    @IsString()
    title: string
    @IsNotEmpty()
    @IsString()
    number: string
    @IsNotEmpty()
    @IsString()
    price: string
    @IsNotEmpty()
    @IsMongoId()
    client: string
}
