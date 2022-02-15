import DataLoader from "dataloader";
import _ from "lodash";
import { MediaModel } from "../models";

const batchMedias = async (ids: any): Promise<any> => {
  //ids = [1, 2, 3]
  const medias = await MediaModel.find({ _id: { $in: ids } });
  // [{uploadedBy: 2}, {uploadedBy: 1}, {uploadedBy: 3}]
  const mediaGrouped = _.groupBy(medias, "uploadedBy");
  // [1: {...media}, 2: {...media}, 3: {...media}]

  return ids.map((id: any) => mediaGrouped[id]);
};

export const createMediaLoader = () => new DataLoader(batchMedias);
