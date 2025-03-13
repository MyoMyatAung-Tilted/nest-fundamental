import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { LoginDto } from './dtos/login.dto';
import { ApiTags } from '@nestjs/swagger';

/**
 * Controller for handling authentication-related routes
 * @class
 */
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  /**
   * Injected AuthService
   * @constructor
   * @param {AuthService} authService
   */
  constructor(private readonly authService: AuthService) {}
  /**
   * Handles user login
   * @param {LoginDto} loginDto - Data transfer object for login
   * @returns {Promise<{ email: string; password: string; token: string; id: string; firstName: string; }>} - The result of the login operation
   */
  @Post('login')
  login(@Body() loginDto: LoginDto): {
    email: string;
    password: string;
    token: string;
  } {
    return this.authService.login(loginDto.email, loginDto.password);
  }
}
