import DataLoader from "dataloader";
import { Media } from "../models/Media";
import { MediaModel } from "../models";

const batchMedias = async (ids: readonly string[]) => {
  const medias = await MediaModel.find({ _id: { $in: ids } });
  const lookup: Record<string, Media> = medias.reduce((acc, media) => {
    acc[media._id.toString()] = media;
    return acc;
  }, {} as Record<string, Media>);

  return ids.map((i) => lookup[i] || null);
};

export const createMediaLoader = () => new DataLoader(batchMedias);
