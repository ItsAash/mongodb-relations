import { MediaModel } from "../models";
import {
  Ctx,
  FieldResolver,
  Query,
  Resolver,
  ResolverInterface,
  Root,
} from "type-graphql";
import { DocumentType } from "@typegoose/typegoose";
import { Media } from "../models/Media";

@Resolver(() => Media)
export class MediaResolver implements ResolverInterface<DocumentType<Media>> {
  @Query(() => [Media])
  async media(): Promise<Media[]> {
    const medias = await MediaModel.find();
    return medias;
  }

  @FieldResolver()
  async uploadedBy(
    @Root() media: DocumentType<Media>,
    @Ctx() { userLoader }: any
  ) {
    const user_id = media.uploadedBy?.toString();
    const user = await userLoader.load(user_id);
    return user;
  }
}
