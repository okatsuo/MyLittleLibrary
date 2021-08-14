import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { makeAddAccountController } from '../factory/add-account'
import { AccountSchema } from '../schema/account'

@Resolver()
export class AccountResolver {
  @Query(() => AccountSchema)
  async getAccount (

  ): Promise<any> {
    return 'aoba'
  }

  @Mutation(() => AccountSchema)
  async userCreate (
    @Arg('name') name: string,
      @Arg('email') email: string,
      @Arg('password') password: string
  ): Promise<any> {
    const addAccount = makeAddAccountController()
    return await addAccount.handle({ name, email, password })
  }
}
