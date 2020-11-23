import { User } from './entity/User';
import { Query, Resolver, Mutation, Arg } from 'type-graphql';
import { hash } from 'bcryptjs'

@Resolver ()
export class UserResolver {
  @Query(() => String) 
  hello() {
    return 'Hello Developers'
  }

  @Mutation(() => Boolean)
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string,
  ) {
    const hashedPassword = await hash(password, 12);
    try {
      await User.insert({
        email, password: hashedPassword
      });
    } catch (error) {
      console.log(error)
      return false;
    }   
    return true;
  }
} 
