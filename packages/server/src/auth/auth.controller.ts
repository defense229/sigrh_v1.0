import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserDto } from './user_.dto';

@ApiTags('AUTH')
@Controller('api/auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() user: UserDto) {
    const { username, password } = user;
    return {
      statusCode: 201,
      data: await this.authService.login(username, password)
    }
  }
}
