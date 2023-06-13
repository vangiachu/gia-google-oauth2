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
      clientID: '204431285224-tkp873oj0pspi6spoq22ge68ckh3b6im.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3001/api/auth/google/redirect',
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