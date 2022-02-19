import { Studio } from "./Studio";
import { Media } from "./Media";
import { getModelForClass } from "@typegoose/typegoose";

export const StudioModel = getModelForClass<typeof Studio>(Studio);
export const MediaModel = getModelForClass<typeof Media>(Media);
