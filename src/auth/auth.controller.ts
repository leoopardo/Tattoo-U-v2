import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/Auth.dto';
import { JwtRefreshTokenAuthGuard } from './guards/jwt-refresh-token-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() authDto: AuthDto) {
    return this.authService.signIn(authDto);
  }

  @UseGuards(JwtRefreshTokenAuthGuard)
  @Post('refresh-tokens')
  async refreshTokens(@Request() { user: payload }: any) {
    return this.authService.refreshTokens(payload);
  }

  @Get('check-token')
  async checkToken(@Query('token') token: string) {
    return await this.authService.confirmationTokenValid(token);
  }
}
