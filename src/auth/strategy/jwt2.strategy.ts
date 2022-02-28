import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

//cookie
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
