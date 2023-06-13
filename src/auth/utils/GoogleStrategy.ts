import { PassportStrategy } from "@nestjs/passport";
import { Inject, Injectable } from "@nestjs/common";
import { Profile, Strategy } from "passport-google-oauth20";
import { AuthService } from "../auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {

  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService
  ) {
    super({
      clientID: '902029731459-8bpa2r5n41p6m5k2ve30nnc5gi2h1i04.apps.googleusercontent.com',
      clientSecret: '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',
      callbackUrl: 'http://localhost:3001/api/auth/google/redirect',
      scope: ['profile', 'email'],
    });
  }
  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    const user = this.authService.validateUser({ email: profile.emails[0].value, displayName: profile.displayName });
    console.log('Validate');
    console.log(user);
    return user || null;
  }
}