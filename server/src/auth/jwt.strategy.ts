import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './auth.constants';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/users.entity';

type Payload = {
  sub: string;
  name: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      // jwtFromRequestは、jwtを抽出するメソッドを指定する。
      // リクエストのAuthorizationヘッダからBearerトークンを取り出す標準的な手法を使用。
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      // ignoreExpirationは、falseの場合、
      // ルートに期限切れの JWT が供給された場合、リクエストは拒否され、401 Unauthorized レスポンスが送信されます。
      // Passport はこれを自動的に処理してくれる。
      ignoreExpiration: false,

      // トークンに署名するためのsecretを指定。
      // PEMエンコードされた公開鍵のようなものの方が本番には適している。
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: Payload): Promise<User> {
    const user = await this.usersService.findOne(payload.sub);
    return user;
  }
}
