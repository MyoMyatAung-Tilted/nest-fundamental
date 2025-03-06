import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from '../../users/providers/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly usersService: UserService,
  ) {}

  public login(email: string, password: string, id: string) {
    const user = this.usersService.findById(id);
    return { ...user, email, password, token: 'SAMPLE_TOKEN' };
  }

  public isAuth() {
    return true;
  }
}
