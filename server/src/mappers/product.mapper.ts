import { Product } from '../api/magnetsServer/generated';
import { PriceAndSizesDocument } from '../models/PricesAndSizes.model';
import { ProductCategoryDocument } from '../models/ProductCategories.model';
import { ProductDocument } from '../models/Products.model';

function mapProductDocumentToProduct(
  product: ProductDocument,
  category: ProductCategoryDocument,
  pricesAndSizes: PriceAndSizesDocument[]
): Product {
  return {
    _id: product._id,
    name: product.name,
    category: category,
    createDate: product.createDate,
    editDate: product.editDate,
    description: product.description,
    imgName: product.imgName,
    isImageUploaded: product.isImageUploaded,
    isRemoved: product.isRemoved,
    pricesAndSizes: pricesAndSizes,
  } as Product;
}

export default {
  mapProductDocumentToProduct,
};
