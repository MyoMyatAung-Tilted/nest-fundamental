import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { UserService } from '../../users/providers/user.service';
import { GenerateTokenProvider } from './generate-token.provider';
import { ActiveUserData } from '../interfaces/active-user-data.interface';

/**
 * Class for refresh token
 * @class
 */
@Injectable()
export class RefreshTokensProvider {
  /**
   * Constructor of RefreshTokensProvider for dependencies injection
   * @param jwtService
   * @param jwtConfiguration
   * @param userService
   * @param generateTokenProvider
   * @constructor
   */
  constructor(
    /**
     * Inject JWT services
     */
    private readonly jwtService: JwtService,
    /**
     * Inject JWT configuration
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    /**
     * Inject User Service
     */
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    /**
     * Inject Generate token Provider
     */
    private readonly generateTokenProvider: GenerateTokenProvider,
  ) {}
  public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      // verify the refresh token
      const { sub } = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, 'sub'>
      >(refreshTokenDto.refreshToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });
      // fetch user
      const user = await this.userService.findOneById(sub);
      // generate token
      return await this.generateTokenProvider.generateToken(user);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
