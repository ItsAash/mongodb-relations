import DataLoader from "dataloader";
import { User } from "src/models/User";
import { Media } from "../models/Media";

export interface MyContext {
  req: Request;
  res: Response;
  mediaLoader: DataLoader<string, Media, string>;
  userLoader: DataLoader<string, User, string>;
}
