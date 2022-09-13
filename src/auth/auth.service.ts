import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as argon2 from 'argon2';
import { AuthDto } from './dto/Auth.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signIn(authDto: AuthDto) {
    const user = await this.usersService.findOne(authDto.email);

    if (!user) throw new UnauthorizedException();

    const passwordMatches = await argon2.verify(
      user.password,
      authDto.password,
    );

    if (!passwordMatches) throw new UnauthorizedException();

    const accessToken = await this.getAccessToken(user);
    const refreshToken = await this.getRefreshToken(user);

    return {
      id: user._id,
      email: user.email,
      firstName: user.firstname,
      lastName: user.lastname,
      country: user.country,
      state: user.state,
      city: user.city,
      accessToken,
      refreshToken,
    };
  }

  async getAccessToken(user: User) {
    const jwtPayload = {
      id: user._id,
      email: user.email,
    };

    return await this.jwtService.signAsync(jwtPayload, {
      secret: this.configService.get<string>('jwt.accessTokenSecret'),
      expiresIn: '90m',
    });
  }

  async getRefreshToken(user: User) {
    const jwtPayload = {
      id: user._id,
      email: user.email,
    };

    const rt = await this.jwtService.signAsync(jwtPayload, {
      secret: this.configService.get<string>('jwt.refreshTokenSecret'),
      expiresIn: '7d',
    });

    await this.usersService.updateRefreshToken(user._id, rt);
    return rt;
  }

  async refreshTokens(payload: any) {
    const user = await this.usersService.findById(payload.id);

    if (!user || !user.refreshToken)
      throw new UnauthorizedException('Invalid refresh token');

    const rtMatches = user.refreshToken === payload.refreshToken;
    if (!rtMatches) throw new UnauthorizedException('Invalid refresh token');

    const accessToken = await this.getAccessToken(user);

    return {
      id: user._id,
      email: user.email,
      firstName: user.firstname,
      lastName: user.lastname,
      country: user.country,
      state: user.state,
      city: user.city,
      accessToken,
      refreshToken: user.refreshToken,
    };
  }

  async confirmationTokenValid(token: string) {
    const payload = await this.jwtService.verify(token, {
      secret: this.configService.get('jwt.confirmationTokenSecret'),
    });

    if (payload) return payload;
  }
}
