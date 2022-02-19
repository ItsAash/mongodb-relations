import DataLoader from "dataloader";
import { Studio } from "../models/Studio";
import { StudioModel } from "../models";

const batchStudios = async (ids: readonly string[]) => {
  const studios = await StudioModel.find({ _id: { $in: ids } });
  const lookup = studios.reduce((acc, studio) => {
    acc[studio._id.toString()] = studio;
    return acc;
  }, {} as Record<string, Studio>);
  return ids.map((i) => lookup[i]);
};

export const createStudioLoader = () =>
  new DataLoader<string, Studio>(batchStudios);
