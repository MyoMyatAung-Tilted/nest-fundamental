import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUserQueryDto } from '../dtos/get-user.dto';
import { AuthService } from '../../auth/providers/auth.service';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';

/**
 * Class to connect to User table and perform business operation
 */
@Injectable()
export class UserService {
  /**
   * Injected AuthService & User Repository
   * @constructor
   * @param {AuthService} authService
   * @param {Repository<User>} userRepository
   * */
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  /** DUMMY QUERY */
  private _query: GetUserQueryDto;
  /**
   * Find all users with query strings
   * @param {GetUserQueryDto} query
   * */
  public findAll(query: GetUserQueryDto) {
    const isAuth = this.authService.isAuth();
    this._query = query;
    return [
      {
        isAuth,
        firstName: 'John',
        email: 'john@doe.com',
      },
      {
        isAuth,
        firstName: 'Alice',
        email: 'alice@doe.com',
      },
    ];
  }
  /**
   * Find the specific user by id
   * @param {string} id
   * */
  public findById(id: string) {
    return {
      id,
      firstName: 'John',
      email: 'john@doe.com',
    };
  }

  /**
   * Create New User
   * */
  public async create(createUserDto: CreateUserDto) {
    // Check User is existed with the same email
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    // Handle Exception

    // Create new user
    let newUser = this.userRepository.create(createUserDto);
    newUser = await this.userRepository.save(newUser);

    return newUser;
  }
}
