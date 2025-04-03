import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Query,
  Body,
  DefaultValuePipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUserParamsDto } from './dtos/get-user.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UserService } from './providers/user.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { CreateManyUsersDto } from './dtos/create-many-users.dto';
import { AccessTokenGuard } from '../auth/guards/access-token/access-token.guard';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly userService: UserService) {}
  @Get()
  @ApiOperation({
    summary: 'Fetches a list of registered users on the application.',
  })
  @ApiResponse({
    status: 200,
    description: 'Users fetched successfully based on the query',
  })
  @ApiQuery({
    name: 'limit',
    description: 'The number of entries response per query',
    type: Number,
    required: false,
    example: 10,
  })
  @ApiQuery({
    name: 'offset',
    description:
      'The position of the page number that you want API to response',
    type: Number,
    required: false,
    example: 1,
  })
  public getAllUsers(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(1), ParseIntPipe) offset: number,
  ) {
    return this.userService.findAll({ limit, offset });
  }
  @Get(':id')
  public getUser(@Param() getUserParamsDto: GetUserParamsDto): string {
    return `This action returns a #${getUserParamsDto.id} user`;
  }

  @ApiOperation({ summary: 'Create new user endpoint' })
  @ApiResponse({ status: 201, description: 'The user is successfully created' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post()
  public createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }
  @ApiOperation({ summary: 'Create many users endpoint' })
  @ApiResponse({
    status: 201,
    description: 'The users are successfully created',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @UseGuards(AccessTokenGuard)
  @Post('create-many')
  public createManyUser(@Body() createManyUsersDto: CreateManyUsersDto) {
    return this.userService.createMany(createManyUsersDto);
  }
  @Patch(':id')
  public updateUser(
    @Param() getUserParamsDto: GetUserParamsDto,
    @Body() patchUserDto: PatchUserDto,
  ) {
    console.log(patchUserDto instanceof PatchUserDto);
    return { ...patchUserDto, id: getUserParamsDto.id };
  }
}
