import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';

@Injectable()
export class BcryptProvider implements HashingProvider {
  async comparePassword(
    data: string | Buffer,
    encrypted: string,
  ): Promise<boolean> {
    return await bcrypt.compare(data, encrypted);
  }

  async hashPassword(data: string | Buffer): Promise<string> {
    // Generate Salt
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(data, salt);
  }
}
