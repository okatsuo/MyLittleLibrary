import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class AccountSchema {
  @Field()
  id: number

  @Field()
  email: string

  @Field()
  name: string

  @Field()
  password: string
}
