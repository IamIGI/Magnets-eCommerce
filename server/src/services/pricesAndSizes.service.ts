import { PricesAndSizesPayload } from '../controllers/pricesAndSizes.controller';

import PriceAndSizeModel from '../models/PricesAndSizes.model';
import { HttpStatusCode } from '../constants/error.constants';
import { DB_COLLECTIONS } from '../config/MongoDB.config';
import appAssert from '../utils/appErrorAssert.utils';

const SERVICE_NAME = DB_COLLECTIONS.PricesAndSizes;

const getAll = async () => {
  const dataArray = await PriceAndSizeModel.find();
  return dataArray;
};

const add = async (payload: PricesAndSizesPayload) => {
  const PriceAndSizes = new PriceAndSizeModel(payload);
  return await PriceAndSizes.save();
};

const editById = async (id: string, payload: PricesAndSizesPayload) => {
  const updatedData = await PriceAndSizeModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  appAssert(
    updatedData,
    HttpStatusCode.NotFound,
    `Not found, id: ${id}`,
    SERVICE_NAME
  );

  return updatedData;
};

const removeById = async (id: string) => {
  const removedItem = await PriceAndSizeModel.findByIdAndDelete(id);
  appAssert(
    removedItem,
    HttpStatusCode.NotFound,
    `Not found, id: ${id}`,
    SERVICE_NAME
  );

  return removedItem;
};

export default {
  getAll,
  add,
  editById,
  removeById,
};
