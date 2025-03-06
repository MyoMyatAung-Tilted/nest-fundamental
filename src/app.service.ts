import { Injectable } from '@nestjs/common';

/**
 * Class to connect AppModule
 * @class
 * */
@Injectable()
export class AppService {
  /** Function to Delete */
  getHello(): string {
    return 'Hello World!';
  }
}
