export interface Wish {
  id: string;
  wishlistId: string;
  title: string;
  desireLvl: number;
  price: number;
  currency: string;
  url: string;
  description: string;
  desiredGiftDate: Date;
}
