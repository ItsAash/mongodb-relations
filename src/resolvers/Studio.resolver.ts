import { StudioModel } from "../models";
import {
  Ctx,
  FieldResolver,
  Query,
  Resolver,
  ResolverInterface,
  Root,
} from "type-graphql";
import { Studio } from "../models/Studio";
import { MediaConnection } from "../structures/MediaConnection";
import { Media } from "../models/Media";
import { MyContext } from "../types/MyContext";
import { DocumentType } from "@typegoose/typegoose";

@Resolver(() => Studio)
export class StudioResolver implements ResolverInterface<DocumentType<Studio>> {
  @FieldResolver()
  async medias(
    @Root() studio: DocumentType<Studio>,
    @Ctx() { mediaLoader }: MyContext
  ): Promise<MediaConnection> {
    const ids = studio.medias.nodes.map((i) => i?.toString());
    const medias = await mediaLoader.loadMany(ids as string[]);
    const mConnection: MediaConnection = studio.medias;
    mConnection.nodes = medias as Media[];
    mConnection.edges.map((e, i) => {
      e.node = medias[i] as Media;
      return e;
    });
    return mConnection;
  }

  @Query(() => [Studio])
  async studio() {
    const studios = await StudioModel.find({});
    return studios;
  }
}
