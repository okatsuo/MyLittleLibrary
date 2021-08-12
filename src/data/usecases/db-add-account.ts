import { IAddAccount, IDbAddAccount } from '../../domain/usecases/add-account'

export interface IEncrypter {
  encrypt: (value: string) => string
}

export class DbAddAccount implements IDbAddAccount {
  constructor (
    private readonly encrypter: IEncrypter,
    private readonly addAccountRepository: IDbAddAccount
  ) {}

  add (account: IAddAccount): any {
    const hashedValue = this.encrypter.encrypt(account.password)
    const repoAccount = this.addAccountRepository.add({ ...account, password: hashedValue })
    return repoAccount
  }
}
