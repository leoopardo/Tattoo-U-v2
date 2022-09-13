import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/users/entities/user.entity';

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-access-token',
) {
  constructor(
    private readonly configService: ConfigService,
    private moduleRef: ModuleRef,
    private jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get('jwt.accessTokenSecret'),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: any) {
    const contextID = ContextIdFactory.getByRequest(request);
    this.jwtService.verify(
      request.headers['authorization'].replace('Bearer ', ''),
      {
        secret: this.configService.get('jwt.accessTokenSecret'),
      },
    );
    const usersService = await this.moduleRef.resolve(UsersService, contextID);
    // const user = await usersService.findOne(payload.email);
    const user = await usersService.findById(payload.id);
    if (!user || user.role === UserRole.API_TOKEN)
      throw new UnauthorizedException();

    return user;
  }
}
