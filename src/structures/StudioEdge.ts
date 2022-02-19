import { prop, mongoose, Ref } from "@typegoose/typegoose";
import { Studio } from "../models/Studio";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class StudioEdge {
  @Field(() => Boolean)
  @prop({ default: false })
  public isMain: boolean;

  @Field(() => Studio)
  @prop({
    ref: () => Studio,
    type: mongoose.Schema.Types.ObjectId,
  })
  public node: Ref<Studio>;
}
