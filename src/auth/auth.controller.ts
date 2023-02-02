import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { AccessTokenGuard } from "src/guards/accessToken.guard";
import { RefreshTokenGuard } from "src/guards/refreshToken.guard";
import { AuthService } from "./auth.service";
import { loginDto } from "./dto/login.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() userData: CreateUserDto) {
        const tokens = await this.authService.register(userData)
        return tokens

    }

    @Post('login')
    async login(@Body() loginData: loginDto) {
        const user = await this.authService.login(loginData)
        return user

    }
    @UseGuards(AccessTokenGuard)
    @Get('logout')
    logout(@Req() req: Request) {
        this.authService.logout(req.user['sub'])
    }
    @UseGuards(RefreshTokenGuard)
    @Get('refresh')
    refreshToken(@Req() req: Request) {
        const userId = req.user['sub']
        const refreshToken = req.user['refreshToken']
        return this.authService.refreshToken(userId, refreshToken)
    }
}   
