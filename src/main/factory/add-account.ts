import { DbAddAccount } from '../../data/usecases/db-add-account'
import { BcryptAdapter } from '../../infra/cryptografy/bcrypt-adapter'
import { AddAccountMongo } from '../../infra/db/mongodb/account-repository/account'
import { SignupController } from '../../presentation/account/signup-controller'
import { EmailValidator } from '../../validation/usecases/email-validator-adapter'

export const makeAddAccountController = (): SignupController => {
  const addAccountMongo = new AddAccountMongo()
  const bcryptAdapter = new BcryptAdapter()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, addAccountMongo)
  const emailValidator = new EmailValidator()
  return new SignupController(emailValidator, dbAddAccount)
}
