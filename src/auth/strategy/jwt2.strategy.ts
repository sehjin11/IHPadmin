import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy2 extends PassportStrategy(Strategy, 'jwt2') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        if (!req || !req.cookies) return null;
        return req.cookies['jwt'];
      },
      ignoreExpiration: false,
      secretOrKey: 'secret-cat-1233',
    });
  }

  async validate(payload: any) {
    console.log('payload', payload);

    return payload;
  }
}
