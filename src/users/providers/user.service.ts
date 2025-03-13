import { Injectable } from '@nestjs/common';
import { GetUserQueryDto } from '../dtos/get-user.dto';
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
   * @param {Repository<User>} userRepository
   * */
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  /** DUMMY QUERY */
  private _query: GetUserQueryDto;
  /**
   * Find all users with query strings
   * @param {GetUserQueryDto} query
   * */
  public async findAll(query: GetUserQueryDto) {
    this._query = query;
    return await this.userRepository.find();
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

  /**
   * Get User by ID
   */
  public async findOneById(id: number) {
    return this.userRepository.findOneBy({ id });
  }
}
