import {
  BadRequestException,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { GetUserQueryDto } from '../dtos/get-user.dto';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import profileConfig from '../config/profile.config';
import { ConfigType } from '@nestjs/config';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { UsersCreateManyProvider } from './users-create-many.provider';

/**
 * Class to connect to User table and perform business operation
 */
@Injectable()
export class UserService {
  /**
   * Injected AuthService & User Repository
   * @constructor
   * @param {Repository<User>} userRepository
   * @param profileConfiguration
   * @param usersCreateManyProvider
   * */
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,
    private readonly usersCreateManyProvider: UsersCreateManyProvider,
  ) {}
  /** DUMMY QUERY */
  private _query: GetUserQueryDto;
  /**
   * Find all users with query strings
   * @param {GetUserQueryDto} query
   * */
  public async findAll(query: GetUserQueryDto) {
    // Testing profileConfiguration
    console.log(this.profileConfiguration);
    console.log(this.profileConfiguration.apiKey);
    this._query = query;
    return await this.userRepository.find();
  }

  /**
   * Create New User
   * */
  public async create(createUserDto: CreateUserDto) {
    let existingUser = undefined;

    try {
      // Check User is existed with the same email
      existingUser = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });
    } catch (error) {
      // Might save the details of the exception in the log file
      console.error(error);
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try later',
        {
          description: 'Error in connecting to database',
        },
      );
    }

    // Handle Exception
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    // Create new user
    let newUser = this.userRepository.create(createUserDto);
    try {
      newUser = await this.userRepository.save(newUser);
    } catch (error) {
      console.error(error);
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try later',
        {
          description: 'Error in connecting to database',
        },
      );
    }

    return newUser;
  }

  /**
   * Get User by ID
   */
  public async findOneById(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  /**
   * Create many users
   * @param createManyUsersDto
   */
  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    return await this.usersCreateManyProvider.createMany(createManyUsersDto);
  }
}
