import { Controller, Post, Body, Patch, UseGuards, Req, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO, UpdateUserDTO } from './dto';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('create-user')
  createUser(@Body() dto: CreateUserDTO) {
    console.log(dto);
    return this.userService.createUser(dto);
  }

  @ApiTags('API')
  @ApiResponse({
    status: 200, type: UpdateUserDTO
  })
  @UseGuards(JwtAuthGuard)
  @Patch()
  updateUser(@Body() updateDto: UpdateUserDTO, @Req() request): Promise<UpdateUserDTO> {
    const user = request.user;
    return this.userService.updateUser(user.email, updateDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteUser(@Req() request) {
    const user = request.user;
    return this.userService.deleteUser(user.email);
  }
}
