import { BadRequestException, ForbiddenException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt"
import { Response } from "express";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UserService } from "src/user/user.service";
import { loginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtSevice: JwtService, private confige: ConfigService) { }

    async register(userData: CreateUserDto) {
        const foundUser = await this.userService.findByEmail(userData.email)
        if (foundUser) {
            throw new HttpException("Alread exsisted", HttpStatus.FOUND)
        }
        const Password = await this.hash(userData.password)
        const user = await this.userService.create({ ...userData, password: Password })
        let tokens = await this.getTokens(user.id, user.userName)
        let refreshToken = await this.hash(tokens.refreshToken)
        this.updateRefreshToken(user.id, refreshToken)
        return tokens
    }
    async login(loginData: loginDto) {
        let userData = await this.userService.findByEmail(loginData.email)
        if (!userData) throw new BadRequestException('User does not exist');
        const Decode = await this.compire(loginData.password, userData.password)
        if (!Decode) throw new BadRequestException('Password is incorrect');
        let tokens = await this.getTokens(userData.id, userData.userName)
        let refreshToken = await this.hash(tokens.refreshToken)
        this.updateRefreshToken(userData.id, refreshToken)
        return tokens
    }


    logout(id: string) {
        return this.userService.update(id, { refreshToken: null })
    }
    updateRefreshToken(id: string, refreshToken: string) {
        this.userService.update(id, { refreshToken })
    }
    async getTokens(id: string, userName: string) {
        let refreshToken =
            await this.jwtSevice.signAsync({
                sub: id,
                userName
            }, {
                secret: this.confige.get<string>('JWT_REFRESH_SECRET'),
                expiresIn: '3m'
            })
        let accsessToken = await this.jwtSevice.signAsync({
            sub: id,
            userName
        }, {
            secret: this.confige.get<string>('JWT_ACCESS_SECRET'),
            expiresIn: '2m'
        })
        return { accsessToken, refreshToken }

    }


    async refreshToken(id: string, RefreshToken: string) {
        const user = await this.userService.findOne(id)
        if (!user || !user.refreshToken) throw new ForbiddenException('Access Denied');
        const refreshTokenPass = await this.compire(RefreshToken, user.refreshToken,)
        if (!refreshTokenPass) throw new ForbiddenException('Access Denied');
        let tokens = await this.getTokens(user.id, user.userName)
        let refreshToken = await this.hash(tokens.refreshToken)
        this.updateRefreshToken(user.id, refreshToken)
        return tokens
    }

    hash(password: string) {
        const SALT = bcrypt.genSaltSync()
        const hashpass = bcrypt.hash(password, SALT)
        return hashpass
    }
    async compire(password: string, hash: string) {
        const cheackPass = await bcrypt.compare(password, hash)
        return cheackPass
    }
}