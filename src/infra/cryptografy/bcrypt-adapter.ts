
import bcrypt from 'bcrypt'
import { IEncrypter } from '../../data/protocols/encrypter'

export class BcryptAdapter implements IEncrypter {
  async encrypt (value: string): Promise<string> {
    const salt = 12
    const hashed = await bcrypt.hash(value, salt)
    return hashed
  }
}
