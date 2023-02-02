import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { AcsessTokenStrategy } from "./strategies/accessToken.strategy";
import { RefreshTokenStrategy } from "./strategies/refreshToken.strategy";

@Module({
    imports: [UserModule, JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, AcsessTokenStrategy, RefreshTokenStrategy]
})
export class AuthModule { }