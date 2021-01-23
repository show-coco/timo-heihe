import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';
import { GooglePrfile } from './types/googleProfile';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/users.entity';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private usersService: UsersService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: 'http://localhost:8080/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: GooglePrfile,
    done: VerifyCallback,
  ): Promise<User> {
    const { name, emails, photos, id } = profile;

    const userDefaultInfo: User = {
      id: id,
      name: name.givenName + ' ' + name.familyName,
      email: emails[0].value,
      avatar: photos[0].value,
      introduction: null,
      githubId: null,
      twitterId: null,
      // accessToken,
    };

    const user = await this.usersService.findOne(id);
    const userExists = Boolean(user);
    // ユーザが既に存在すれば、ユーザを取得して返却
    if (userExists) {
      return user;
    }

    // 存在しなければ、ユーザをDBに保存して返却
    const newUser = await this.usersService.save(userDefaultInfo);
    return newUser;
  }
}
