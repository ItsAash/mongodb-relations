import { modelOptions, mongoose, prop } from "@typegoose/typegoose";
import { StudioConnection } from "../structures/StudioConnection";
import { Field, ObjectType } from "type-graphql";
import { FuzzyDate } from "../structures/FuzzyDate";

@ObjectType()
export class MediaTitle {
  @Field(() => String)
  @prop()
  public romanji: string;

  @Field(() => String)
  @prop()
  public english: string;

  @Field(() => String)
  @prop()
  public native: string;

  @prop()
  @Field(() => String)
  public userPreferred: string;
}

@modelOptions({ schemaOptions: { collection: "medias" } })
@ObjectType()
export class Media {
  @Field(() => String)
  _id: mongoose.Types.ObjectId;

  @Field()
  @prop({ _id: false })
  public title: MediaTitle;

  @Field(() => FuzzyDate)
  @prop({ _id: false })
  public releasedDate!: FuzzyDate;

  @Field(() => StudioConnection)
  @prop({
    _id: false,
    default: () => ({
      edges: [],
      nodes: [],
    }),
  })
  public studios: StudioConnection;
}
