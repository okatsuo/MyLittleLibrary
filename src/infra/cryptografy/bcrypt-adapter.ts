import { IEncrypter } from '../../data/usecases/db-add-account'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements IEncrypter {
  async encrypt (value: string): Promise<string> {
    const salt = 12
    const hashed = await bcrypt.hash(value, salt)
    return hashed
  }
}
