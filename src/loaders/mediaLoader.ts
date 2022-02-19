import DataLoader from "dataloader";
import { MediaModel } from "../models";
import { Media } from "../models/Media";

const batchMedia = async (ids: readonly string[]) => {
  const medias = await MediaModel.find({ _id: { $in: ids } });
  const lookup = medias.reduce((acc, media) => {
    acc[media._id.toString()] = media;
    return acc;
  }, {} as Record<string, Media>);
  return ids.map((i) => lookup[i]);
};

export const createMediaLoader = () =>
  new DataLoader<string, Media>(batchMedia);
