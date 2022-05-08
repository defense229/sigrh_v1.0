import {
  Body,
  Controller,
  Post,
  HttpStatus,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { User } from './user.schema';
import { UserDto } from './user_.dto';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('users')
  async all() {
    return await this.authService.all();
  }

  @Post('login')
  async login(@Body() user: UserDto) {
    const { username, password } = user;
    return {
      statusCode: HttpStatus.OK,
      data: await this.authService.login(username, password),
    };
  }

  @Post('register')
  async register(@Body() user: User) {
    return await this.authService.register(user);
  }

  @Delete('user/:id')
  async remove(@Param('id') id: string) {
    console.log(id);
    return await this.authService.remove(id);
  }
}
