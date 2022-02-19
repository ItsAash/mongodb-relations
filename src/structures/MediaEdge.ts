import { mongoose, prop, Ref } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { Media } from "../models/Media";

@ObjectType()
export class MediaEdge {
  @Field(() => Boolean)
  @prop({ default: false })
  public isMain: boolean;

  @Field(() => Media)
  @prop({
    ref: () => Media,
    type: mongoose.Schema.Types.ObjectId,
  })
  public node: Ref<Media>;
}
