import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { User } from '../../users/user.entity';
import { ActiveUserData } from '../interfaces/active-user-data.interface';

/**
 * Class for generate token
 * @class
 */
@Injectable()
export class GenerateTokenProvider {
  @Inject(jwtConfig.KEY)
  /**
   * Inject JWT configuration
   */
  private readonly jwtConfiguration: ConfigType<typeof jwtConfig>;

  /**
   * Constructor for generate token
   * @param jwtService
   * @param jwtConfiguration
   * @constructor
   */
  constructor(
    /**
     * Inject JWT service
     */
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {
    this.jwtConfiguration = jwtConfiguration;
  }

  /**
   * Method for sign token
   * @param userId
   * @param expiresIn
   * @param payload
   */
  public async signToken<T>(userId: number, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: expiresIn,
      },
    );
  }

  /**
   * Method for generate token using signToken
   * @param user
   */
  public async generateToken(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      // Generate access token
      this.signToken<Partial<ActiveUserData>>(
        user.id,
        this.jwtConfiguration.accessTokenTtl,
        { email: user.email },
      ),
      // Generate refresh token
      this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl),
    ]);

    return { accessToken, refreshToken };
  }
}
