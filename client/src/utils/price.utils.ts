function calculatePrice(
  SIZES: {
    id: string;
    desc: string;
    price: number;
  }[],
  sizeId: string,
  quantity: number
) {
  const sizePrice = SIZES.find((s) => s.id === sizeId)?.price;
  if (sizePrice) {
    return sizePrice * quantity;
  }
  return 0;
}

function displayPrice(price: number) {
  return price.toFixed(2);
}

export default { calculatePrice, displayPrice };
