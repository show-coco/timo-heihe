import { Controller, UseGuards, Get, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { RequestWithUser } from './types/request';

@Controller('google')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // do nothing
  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: RequestWithUser, @Res() res: Response) {
    const token = await this.authService.login(req.user);
    console.log(req.user);

    const redirectUrl = `http://localhost:3000/google/callback?access_token=${token.access_token}&name=${req.user.name}&id=${req.user.id}&userId=${req.user.userId}`;
    res.redirect(redirectUrl);
  }
}
