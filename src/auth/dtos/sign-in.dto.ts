import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

/**
 * Data transfer object for user login
 * @class
 */
export class SignInDto {
  /**
   * User's email address
   * @type {string}
   */
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * User's password
   * @type {string}
   */
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/,
    {
      message:
        'Minimum eight characters, at least one letter, one number and one special character',
    },
  )
  password: string;
}
