import { IAccountModel } from '../models/account'

export interface IAddAccount {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}
export interface IDbAddAccount {
  add: (account: IAddAccount) => Promise<IAccountModel>
}
