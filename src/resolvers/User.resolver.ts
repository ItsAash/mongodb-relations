import { Ctx, Query, Resolver } from "type-graphql";
import { UserModel } from "../models";
import { User } from "../models/User";

@Resolver(() => User)
export class UserResolver {
  @Query(() => [User])
  async users(@Ctx() { mediaLoader }: any): Promise<User[]> {
    const allUsers = await UserModel.find().populate("medias").exec();
    return allUsers;
  }
}
