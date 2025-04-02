import { Inject, Injectable } from '@nestjs/common';
import { GetUserQueryDto } from '../dtos/get-user.dto';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import profileConfig from '../config/profile.config';
import { ConfigType } from '@nestjs/config';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { CreateUserProvider } from './create-user.provider';
import { FindOneByEmailProvider } from './find-one-by-email.provider';

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
   * @param createUserProvider
   * @param findOneByEmailProvider
   * */
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,
    private readonly usersCreateManyProvider: UsersCreateManyProvider,
    private readonly createUserProvider: CreateUserProvider,
    private readonly findOneByEmailProvider: FindOneByEmailProvider,
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
    return await this.createUserProvider.createUser(createUserDto);
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

  public async findOneByEmail(email: string) {
    return await this.findOneByEmailProvider.findOneByEmail(email);
  }
}
