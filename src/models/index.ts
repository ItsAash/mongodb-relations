import { User } from "./User";
import { Media } from "./Media";
import { getModelForClass } from "@typegoose/typegoose";

export const UserModel = getModelForClass<typeof User>(User);
export const MediaModel = getModelForClass<typeof Media>(Media);
