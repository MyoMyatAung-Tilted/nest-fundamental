import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { User } from '../user.entity';

/**
 * Provider class to create many users
 * @class
 */
@Injectable()
export class UsersCreateManyProvider {
  /**
   * Constructor to inject the dependencies
   * @param dataSource
   * @constructor
   */
  constructor(
    /**
     * Inject the Datasource
     */
    private readonly dataSource: DataSource,
  ) {}

  /**
   * Create many users
   * @param createManyUsersDto
   */
  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    const users: User[] = [];

    // Create query runner instance
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      // Connect the query runner to the datasource
      await queryRunner.connect();
      // Start transaction
      await queryRunner.startTransaction();
    } catch (error) {
      throw new RequestTimeoutException('Could not connect to database', {
        description: String(error),
      });
    }

    try {
      for (const user of createManyUsersDto.users) {
        const newUser = queryRunner.manager.create(User, user);
        const result = await queryRunner.manager.save(newUser);
        users.push(result);
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      // Rollback the transaction if an error occurs
      console.error(error);
      await queryRunner.rollbackTransaction();
      throw new ConflictException('Could not complete the request', {
        description: String(error),
      });
    } finally {
      await queryRunner.release();
    }

    return users;
  }
}
