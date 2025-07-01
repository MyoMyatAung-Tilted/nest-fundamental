import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { HashingProvider } from '../../auth/providers/hashing.provider';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from '../../mail/providers/mail.service';

@Injectable()
export class CreateUserProvider {
  constructor(
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mailService: MailService,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    let existingUser = undefined;
    try {
      existingUser = await this.userRepository.findOneBy({
        email: createUserDto.email,
      });
    } catch (error) {
      console.error(error);
      throw new RequestTimeoutException(
        'Unable to process your request at the moment',
      );
    }
    if (existingUser) {
      throw new BadRequestException('The user already exists');
    }

    let newUser = this.userRepository.create({
      ...createUserDto,
      password: await this.hashingProvider.hashPassword(createUserDto.password),
    });

    try {
      newUser = await this.userRepository.save(newUser);
    } catch (error) {
      console.error(error);
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the the datbase',
        },
      );
    }

    try {
      await this.mailService.sendUserWelcomeEmail(newUser);
    } catch (error) {
      console.error(error);
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error sending welcome email',
        },
      );
    }

    return newUser;
  }
}
