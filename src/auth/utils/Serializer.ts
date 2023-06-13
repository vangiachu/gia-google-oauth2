import { PassportSerializer } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { use } from "passport";
import { User } from "src/typeorm/entities/User";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService
  ) {
    super();
  }

  serializeUser(user: User, done: Function) {
    console.log('Serialize User');
    done(null, user);
  }

  async deserializeUser(payload: any, done: Function) {
    const user = await this.authService.findUser(payload.id);
    console.log('Deserialize User');
    console.log(user);
    return user ? done(null, user) : done(null, null);
  }
}