import { MediaModel } from "../models";
import { Media } from "../models/Media";
import { StudioConnection } from "../structures/StudioConnection";
import {
  Ctx,
  FieldResolver,
  Query,
  Resolver,
  ResolverInterface,
  Root,
} from "type-graphql";
import { DocumentType } from "@typegoose/typegoose";
import { MyContext } from "../types/MyContext";
import { Studio } from "../models/Studio";

@Resolver(() => Media)
export class MediaResovler implements ResolverInterface<DocumentType<Media>> {
  @FieldResolver(() => StudioConnection)
  async studios(
    @Root() media: DocumentType<Media>,
    @Ctx() { studioLoader }: MyContext
  ): Promise<StudioConnection> {
    const ids = media.studios.nodes.map((i) => i?.toString());
    const studios = await studioLoader.loadMany(ids as string[]);
    const sConnection: StudioConnection = media.studios;
    sConnection.nodes = studios as Studio[];
    sConnection.edges.map((e, i) => {
      e.node = studios[i] as Studio;
      return e;
    });
    return sConnection;
  }

  @Query(() => [Media])
  async media(): Promise<Media[]> {
    const medias = await MediaModel.find();
    return medias;
  }
}
