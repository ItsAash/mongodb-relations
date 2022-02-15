import { modelOptions, mongoose, prop, Ref } from "@typegoose/typegoose";
import { FuzzyDate } from "../structures/FuzzyDate";
import { Field, ObjectType } from "type-graphql";
import { User } from "./User";

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

  @Field(() => User)
  @prop({
    ref: () => User,
    type: mongoose.Schema.Types.ObjectId,
  })
  public uploadedBy!: Ref<User>;
}
