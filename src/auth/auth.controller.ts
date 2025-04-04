import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SignInDto } from './dtos/sign-in.dto';
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
   * Handles user sign in
   * @param {SignInDto} signInDto - Data transfer object for sign in
   */
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
