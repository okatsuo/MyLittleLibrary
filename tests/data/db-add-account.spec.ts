import { DbAddAccount, IEncrypter } from '../../src/data/usecases/db-add-account'
import { IAccountModel } from '../../src/domain/models/account'
import { IAddAccount, IDbAddAccount } from '../../src/domain/usecases/add-account'

const makeEncrypterStub = (): IEncrypter => {
  class EncrypterStub implements IEncrypter {
    encrypt (value: string): string {
      return 'hashed_password'
    }
  }
  return new EncrypterStub()
}

const makeDbAddAccountRepoStub = (): IDbAddAccount => {
  class AddAccountRepoStub implements IDbAddAccount {
    async add (account: IAddAccount): Promise<IAccountModel> {
      return { ...account, id: 'valid_id' }
    }
  }
  return new AddAccountRepoStub()
}

interface SutType {
  sut: DbAddAccount
  encrypterStub: IEncrypter
  DbAddAccountRepoStub: IDbAddAccount
}

const makeSut = (): SutType => {
  const encrypterStub = makeEncrypterStub()
  const DbAddAccountRepoStub = makeDbAddAccountRepoStub()
  const sut = new DbAddAccount(encrypterStub, DbAddAccountRepoStub)
  return {
    sut,
    encrypterStub,
    DbAddAccountRepoStub
  }
}

describe('DbAddAccount', () => {
  test('should call encrypter with correct values', () => {
    const { sut, encrypterStub } = makeSut()
    const encrypterSpy = jest.spyOn(encrypterStub, 'encrypt')
    const fakeAccount: IAddAccount = {
      name: 'valid_name',
      email: 'valid_mail@mail.com',
      password: 'valid_password'
    }
    sut.add(fakeAccount)
    expect(encrypterSpy).toBeCalledWith('valid_password')
  })

  test('should be returned a hashed_password', () => {
    const { sut, encrypterStub } = makeSut()
    const fakeAccount: IAddAccount = {
      name: 'valid_name',
      email: 'valid_mail@mail.com',
      password: 'valid_password'
    }
    const encrypterSpy = jest.spyOn(encrypterStub, 'encrypt')
    sut.add(fakeAccount)
    expect(encrypterSpy).toReturnWith('hashed_password')
  })

  test('should call addAccountRepo with correct values', () => {
    const { sut, DbAddAccountRepoStub } = makeSut()
    const addAccountRepoSpy = jest.spyOn(DbAddAccountRepoStub, 'add')
    const fakeAccount: IAddAccount = {
      name: 'valid_name',
      email: 'valid_mail@mail.com',
      password: 'hashed_password'
    }
    sut.add(fakeAccount)
    expect(addAccountRepoSpy).toBeCalledWith(fakeAccount)
  })
})
