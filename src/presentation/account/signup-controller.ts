import { IEmailValidator } from '../../validation/protocols/email-validator'

export interface IAddAccount {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export interface IAccountModel {
  id: string
  name: string
  email: string
  password: string
}
export interface IDbAddAccount {
  add: (account: IAddAccount) => Promise<IAccountModel>
}

export class SignupController {
  constructor (
    private readonly emailValidator: IEmailValidator,
    private readonly addAccount: IDbAddAccount
  ) {}

  async handle (account: IAddAccount): Promise<IAccountModel> {
    const isValidEmail = this.emailValidator.isValid(account.email)
    if (!isValidEmail) { throw new Error('invalid email') }
    if (account.password !== account.passwordConfirmation) { throw Error('invalid password confirmation') }
    const user = await this.addAccount.add(account)
    return user
  }
}
