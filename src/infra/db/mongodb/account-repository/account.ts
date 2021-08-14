import { IAccountModel } from '../../../../domain/models/account'
import { IAddAccount, IDbAddAccount } from '../../../../domain/usecases/add-account'
import { AccountEntity } from '../../entity/account'

export class AddAccountMongo implements IDbAddAccount {
  async add (accountData: IAddAccount): Promise<IAccountModel> {
    const account = AccountEntity.create(accountData)
    await account.save()
    return account
  }
}
