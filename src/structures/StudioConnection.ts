import { prop, mongoose, Ref } from "@typegoose/typegoose";
import { StudioEdge } from "./StudioEdge";
import { Studio } from "../models/Studio";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class StudioConnection {
  @Field(() => [StudioEdge])
  @prop({ default: [] })
  public edges: StudioEdge[];

  @Field(() => [Studio])
  @prop({
    ref: () => Studio,
    default: [],
    type: [mongoose.Schema.Types.ObjectId],
  })
  public nodes: Ref<Studio>[];
}
