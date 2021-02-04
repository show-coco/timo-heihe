import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './types/payload';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user) {
    const payload: Payload = { name: user.name, sub: user.id };
    console.log(this.jwtService.sign(payload));
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
