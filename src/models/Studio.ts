import { mongoose, prop } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { MediaConnection } from "../structures/MediaConnection";

@ObjectType()
export class Studio {
  @Field(() => String)
  public _id: mongoose.Types.ObjectId;

  @Field(() => String)
  @prop()
  public name: string;

  @Field(() => Boolean)
  @prop({ required: true })
  public isAnimationStudio: boolean;

  @Field(() => MediaConnection, {
    nullable: true,
    defaultValue: [{ nodes: [], edges: [] }],
  })
  @prop({
    default: () => ({ nodes: [], edges: [] }),
  })
  public medias: MediaConnection;
}
