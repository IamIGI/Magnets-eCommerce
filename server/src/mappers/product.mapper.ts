import {
  PriceAndSizes,
  Product,
  ProductCategory,
} from '../api/magnetsServer/generated';

import { ProductDocument } from '../models/Products.model';

function mapProductDocumentToProduct(product: ProductDocument): Product {
  return {
    _id: product._id,
    name: product.name,
    category: product.categoryId as unknown as ProductCategory,
    createDate: product.createDate,
    editDate: product.editDate,
    description: product.description,
    imgNames: product.imgNames,
    isUserImageRequired: product.isUserImageRequired,
    isRemoved: product.isRemoved,
    pricesAndSizes: product.pricesAndSizesIds as unknown as PriceAndSizes[],
  } as Product;
}

export default {
  mapProductDocumentToProduct,
};
