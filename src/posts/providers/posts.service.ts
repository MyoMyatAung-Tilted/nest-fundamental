import { Injectable } from '@nestjs/common';
import { UserService } from '../../users/providers/user.service';

@Injectable()
export class PostsService {
  constructor(private readonly usersServices: UserService) {}

  public findAll(userId: string) {
    const user = this.usersServices.findById(userId);
    return [
      {
        user,
        title: 'Hello World',
        description:
          'The command query responsibility segregation (CQRS) pattern separates the data mutation, or the command part of a system, from the query part',
      },
      {
        user,
        title: 'Hello World 1',
        description:
          'The command query responsibility segregation (CQRS) pattern separates the data mutation, or the command part of a system, from the query part',
      },
    ];
  }
}
