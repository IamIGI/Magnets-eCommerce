import { Product, ProductUpdateData } from '../api/magnetsServer/generated';
import { ProductPayload } from '../controllers/products.controller';
import productMapper from '../mappers/product.mapper';
import PriceAndSizeModel from '../models/PricesAndSizes.model';
import ProductCategoryModel from '../models/ProductCategories.model';
import ProductModel, { ProductDocument } from '../models/Products.model';

const SERVICE_NAME = 'Products';

const getAll = async (): Promise<Product[]> => {
  try {
    const products = await ProductModel.find();
    const pricesAndSizes = await PriceAndSizeModel.find();
    const categories = await ProductCategoryModel.find();

    const productsData = products.map((product) => {
      const categoryItem = categories.find((item) => {
        return item._id.toString() === product.categoryId.toString();
      });
      const priceAndSizeItems = pricesAndSizes.filter((item) =>
        product.pricesAndSizesIds.includes(item._id)
      );
      if (!categoryItem || priceAndSizeItems.length === 0) {
        console.log(categoryItem);
        throw new Error(
          `Could not found category or price for given product.\n 
            category: ${Boolean(categoryItem)}\n
            priceAndSizeItems: ${priceAndSizeItems.length === 0} `
        );
      }
      return productMapper.mapProductDocumentToProduct(
        product,
        categoryItem,
        pricesAndSizes
      );
    });

    return productsData;
  } catch (err: any) {
    throw new Error(`Failed to fetch products.\n Error:${err.message}`);
  }
};

const getById = async (id: string) => {
  try {
    const product = await ProductModel.findById(id);
    if (!product) {
      throw new Error(`Product not found. Id: ${id}`);
    }

    const category = await ProductCategoryModel.findById(product.categoryId);
    const priceAndSizeItems = await PriceAndSizeModel.find({
      _id: { $in: product.pricesAndSizesIds },
    });
    if (!category || priceAndSizeItems.length === 0) {
      throw new Error(
        `Could not found category or price for given product.\n 
            category: ${Boolean(category)}\n
            priceAndSizeItems: ${priceAndSizeItems.length === 0} `
      );
    }

    return productMapper.mapProductDocumentToProduct(
      product,
      category,
      priceAndSizeItems
    );
  } catch (err: any) {
    throw new Error(
      `Failed to fetch product with ID ${id}:\n Error: ${err.message}`
    );
  }
};

const add = async (productData: ProductPayload): Promise<ProductDocument> => {
  try {
    const newProduct: ProductUpdateData = {
      ...productData,
      createDate: new Date().toISOString(),
      editDate: new Date().toISOString(),
    };

    const product = new ProductModel(newProduct);
    return await product.save();
  } catch (err: any) {
    throw new Error(`Failed to create product.\n Error: ${err.message}`);
  }
};

const editById = async (id: string, productData: ProductPayload) => {
  try {
    const product = await ProductModel.findById(id);
    if (!product) {
      throw new Error(`Product not found. Id: ${id}`);
    }

    const updateData: ProductUpdateData = {
      ...productData,
      createDate: product.createDate,
      editDate: new Date().toISOString(),
    };

    return await ProductModel.findByIdAndUpdate(id, updateData, { new: true });
  } catch (err: any) {
    throw new Error(`Failed to update product with ID ${id}: ${err.message}`);
  }
};

const removeById = async (id: string) => {
  try {
    const document = await ProductModel.findByIdAndDelete(id);
    if (!document) {
      throw new Error(`No document in ${SERVICE_NAME} with given id`);
    }
  } catch (err: any) {
    throw new Error(`Failed to delete product with ID ${id}: ${err.message}`);
  }
};

export default {
  getAll,
  getById,
  add,
  editById,
  removeById,
};
