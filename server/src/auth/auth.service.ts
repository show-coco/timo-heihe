import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login(req) {
    // TODO: return jwt
    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
