import { ImgSize } from '../interfaces/products';

export const productsList = [
  {
    id: crypto.randomUUID(),
    name: 'Magnesy prostokątne',
    price: 12.0,
    imgSrc: 'products/product1.JPG',
  },
  {
    id: crypto.randomUUID(),
    name: 'Retroramka',
    price: 12.99,
    imgSrc: 'products/product1.JPG',
  },
  {
    id: crypto.randomUUID(),
    name: 'Gotowe magnesy',
    price: 25.12,
    imgSrc: 'products/product1.JPG',
  },
  {
    id: crypto.randomUUID(),
    name: 'Zesawy magnesów',
    price: 100.51,
    imgSrc: 'products/product1.JPG',
  },
];

// export const PRODUCT_DATA: Product = {
//   id: crypto.randomUUID(),
//   name: 'Product Name',
//   description:
//     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, eleifend nunc. Nullam nec nunc nec nunc.',
//   imgName: 'productItem_1.jpg',
//   createDate: new Date(),
//   editDate: new Date(),
//   price: {
//     defaultPrice: 10,
//     editDate: new Date(),
//     discountPrice: 9,
//     lowestPrice30day: 5,
//   },
// };
export const IMG_SIZES_ARR: ImgSize[] = [
  { id: '6.8x6.8', desc: '6,8 x 6,8 cm', price: 2.9 },
  { id: '9.5x6.8', desc: '9,5 x 6,8 cm', price: 5 },
  { id: '9.5x9.5', desc: '9,5 x 9,5 cm', price: 7.2 },
  { id: '10x14', desc: '10 x 14 cm', price: 9.1 },
];

// export const CART_ITEMS_DATA: CartItem[] = [
//   {
//     id: crypto.randomUUID(),
//     name: 'Magnes kwadratowy',
//     price: 0,
//     quantity: QUANTITY_ARR[2],
//     size: IMG_SIZES_ARR[0],
//     imgName: 'productItem_1.jpg',
//   },
//   {
//     id: crypto.randomUUID(),
//     name: 'Magnes prostokątny',
//     price: 0,
//     quantity: QUANTITY_ARR[3],
//     size: IMG_SIZES_ARR[1],
//     imgName: 'productItem_2.jpg',
//   },
//   {
//     id: crypto.randomUUID(),
//     name: 'Walentynkowy magnes',
//     price: 0,
//     quantity: QUANTITY_ARR[5],
//     size: IMG_SIZES_ARR[2],
//     imgName: 'productItem_3.jpg',
//   },
// ];
// export const CART_DATA = {
//   items: CART_ITEMS_DATA,
//   totalQuantity: CART_ITEMS_DATA.length,
//   totalPrice: CART_ITEMS_DATA.reduce((acc, item) => acc + item.price, 0),
// };
