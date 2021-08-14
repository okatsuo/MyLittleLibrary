import { IAccountModel } from './account'

export interface ILoginModel {
  token: string
  user: IAccountModel
}
