import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto-js';
import { enviroument } from '../../env/env';
@Injectable()
export class UtilsService {
  encryptPassword(password: string) {
    return crypto.AES.encrypt(password, enviroument.SECRET_KEY).toString();
  }

  decryptPassword(passwordEncrypt: string) {
    const bytes = crypto.AES.decrypt(passwordEncrypt, enviroument.SECRET_KEY);
    return bytes.toString(crypto.enc.Utf8);
  }
}
