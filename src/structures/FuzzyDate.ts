import { prop } from "@typegoose/typegoose";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class FuzzyDate {
  @Field(() => Int)
  @prop()
  public year: number;

  @prop()
  @Field(() => Int)
  public month: number;

  @prop()
  @Field(() => Int)
  public day: number;
}
