export interface CartItem {
  id: string;
  name: string;
  price: number;
  size: ListItem;
  quantity: ListItem;
  imgName: string;
}

export interface Cart {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

export interface ListItem {
  id: string;
  desc: string;
  price?: number;
}
