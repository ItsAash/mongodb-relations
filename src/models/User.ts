import { prop, DocumentType, Ref, mongoose } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { Media } from "./Media";

@ObjectType()
export class UserName {
  @Field(() => String)
  @prop()
  public firstName!: string;

  @Field(() => String)
  @prop()
  public lastName!: string;

  @Field(() => String)
  @prop({
    default: function (this: DocumentType<UserName>) {
      return this.firstName + " " + this.lastName;
    },
    required: false,
  })
  public fullName: String;
}

@ObjectType()
export class User {
  @Field(() => String)
  public _id: mongoose.Types.ObjectId;

  @Field(() => UserName)
  @prop({ _id: false })
  public name: UserName;

  @Field(() => [Media])
  @prop({
    ref: () => Media,
    type: [mongoose.Schema.Types.ObjectId],
    default: () => [],
  })
  public medias: Ref<Media>[];
}
