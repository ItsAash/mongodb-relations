import DataLoader from "dataloader";
import { Media } from "../models/Media";
import { Studio } from "../models/Studio";

export interface MyContext {
  req: Request;
  res: Response;
  studioLoader: DataLoader<string, Studio, string>;
  mediaLoader: DataLoader<string, Media, string>;
}
