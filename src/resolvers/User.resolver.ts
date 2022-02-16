import { Media } from "../models/Media";
import { MyContext } from "../types/MyContext";
import {
  Ctx,
  FieldResolver,
  Query,
  Resolver,
  ResolverInterface,
  Root,
} from "type-graphql";
import { DocumentType } from "@typegoose/typegoose";
import { UserModel } from "../models";
import { User } from "../models/User";

@Resolver(() => User)
export class UserResolver implements ResolverInterface<DocumentType<User>> {
  @FieldResolver(() => [Media])
  async medias(
    @Root() user: DocumentType<User>,
    @Ctx() { mediaLoader }: MyContext
  ): Promise<Media[]> {
    const mediasIds = user.medias?.map((e) => e?.toString());
    const medias = await mediaLoader.loadMany(mediasIds as string[]);
    return medias as Media[];
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    const allUsers = await UserModel.find();
    return allUsers;
  }
}
