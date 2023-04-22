import { Body, Controller, Post, UseGuards, Get, Req} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDTO } from "../users/dto";
import { UserLoginDTO } from "./dto";
import { AuthUserResponse } from "./response";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UsersService } from "../users/users.service";
import { JwtAuthGuard } from "src/guards/jwt-guard";
import { BadRequestException } from "@nestjs/common";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
    ) {
  }

  @ApiTags('API')
  @ApiResponse({status: 201, type: CreateUserDTO})
  @Post("register")
  register(@Body() dto: CreateUserDTO): Promise<CreateUserDTO> {
    return this.authService.registerUsers(dto);
  }

  @ApiTags('API')
  @ApiResponse({status: 200, type: AuthUserResponse})
  @Post("login")
  login(@Body() dto: UserLoginDTO): Promise<AuthUserResponse | BadRequestException> {
    return this.authService.loginUser(dto);
  }

  //только авториз. пользователь
  @UseGuards(JwtAuthGuard)
  @Get('get-public-user-info')
  getPublicUserInfo(@Req() request) {
    const user = request.user
    return this.userService.publicUser(user.email);
  }
}