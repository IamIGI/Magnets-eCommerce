import { PricesAndSizesPayload } from '../controllers/pricesAndSizes.controller';
import { createCustomError } from '../handlers/error.handler';
import PriceAndSizeModel from '../models/PricesAndSizes.model';
import { HttpStatusCode } from '../types/error.type';

const SERVICE_NAME = 'PricesAndSizes';

const getAll = async () => {
  try {
    const dataArray = await PriceAndSizeModel.find();
    return dataArray;
  } catch (err: any) {
    throw createCustomError(
      HttpStatusCode.InternalServerError,
      SERVICE_NAME,
      JSON.stringify(err)
    );
  }
};

const add = async (payload: PricesAndSizesPayload) => {
  try {
    const PriceAndSizes = new PriceAndSizeModel(payload);

    return await PriceAndSizes.save();
  } catch (err: any) {
    throw createCustomError(
      HttpStatusCode.InternalServerError,
      SERVICE_NAME,
      JSON.stringify(err)
    );
  }
};

const editById = async (id: string, payload: PricesAndSizesPayload) => {
  try {
    return await PriceAndSizeModel.findByIdAndUpdate(id, payload, {
      new: true,
    }).then((data) => {
      if (!data) {
        throw createCustomError(
          HttpStatusCode.NotFound,
          SERVICE_NAME,
          `Not found, id: ${id}`
        );
      }
      return data;
    });
  } catch (err: any) {
    throw err;
  }
};

const removeById = async (id: string) => {
  try {
    return await PriceAndSizeModel.findByIdAndDelete(id).then((data) => {
      if (!data) {
        throw createCustomError(
          HttpStatusCode.NotFound,
          SERVICE_NAME,
          `Not found, id: ${id}`
        );
      }
      return data;
    });
  } catch (err: any) {
    throw err;
  }
};

export default {
  getAll,
  add,
  editById,
  removeById,
};
