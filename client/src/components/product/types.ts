export type Sizes = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export type ProductValue = {
  _id: string;
  category: string;
  color: string;
  description: string;
  gallery: string[];
  gender: 'Men' |'Women';
  name: string;
  price: number;
  quantity: Record<Sizes, number>;
  sizes: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
};
