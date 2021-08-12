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

const makeAddAccountRepoStub = (): IDbAddAccount => {
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
  addAccountRepoStub: IDbAddAccount
}

const makeSut = (): SutType => {
  const encrypterStub = makeEncrypterStub()
  const addAccountRepoStub = makeAddAccountRepoStub()
  const sut = new DbAddAccount(encrypterStub, addAccountRepoStub)
  return {
    sut,
    encrypterStub,
    addAccountRepoStub
  }
}

describe('DbAddAccount', () => {
  test('should call encrypter with correct values', () => {
    const { sut, encrypterStub } = makeSut()
    const encrypterSpy = jest.spyOn(encrypterStub, 'encrypt')
    const fakeAccount: IAddAccount = {
      name: 'valid_name',
      email: 'valid_mail@mail.com',
      password: 'valid_password',
      passwordConfirmation: 'valid_password'
    }
    sut.add(fakeAccount)
    expect(encrypterSpy).toBeCalledWith('valid_password')
  })

  test('should be returned a hashed_password', () => {
    const { sut, encrypterStub } = makeSut()
    const fakeAccount: IAddAccount = {
      name: 'valid_name',
      email: 'valid_mail@mail.com',
      password: 'valid_password',
      passwordConfirmation: 'valid_password'
    }
    const encrypterSpy = jest.spyOn(encrypterStub, 'encrypt')
    sut.add(fakeAccount)
    expect(encrypterSpy).toReturnWith('hashed_password')
  })

  test('should call addAccountRepo with correct values', () => {
    const { sut, addAccountRepoStub } = makeSut()
    const addAccountRepoSpy = jest.spyOn(addAccountRepoStub, 'add')
    const fakeAccount: IAddAccount = {
      name: 'valid_name',
      email: 'valid_mail@mail.com',
      password: 'hashed_password',
      passwordConfirmation: 'valid_password'
    }
    sut.add(fakeAccount)
    expect(addAccountRepoSpy).toBeCalledWith(fakeAccount)
  })
})
