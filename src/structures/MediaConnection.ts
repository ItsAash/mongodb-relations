import { mongoose, prop, Ref } from "@typegoose/typegoose";
import { Media } from "../models/Media";
import { Field, ObjectType } from "type-graphql";
import { MediaEdge } from "./MediaEdge";

@ObjectType()
export class MediaConnection {
  @Field(() => [MediaEdge])
  @prop({ default: [] })
  public edges: MediaEdge[];

  @Field(() => [Media])
  @prop({
    ref: () => Media,
    default: [],
    type: [mongoose.Schema.Types.ObjectId],
  })
  public nodes: Ref<Media>[];
}
