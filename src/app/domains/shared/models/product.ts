import {Category} from '@shared/models/category';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  creationAt: string;
  updateAt: string;
  category: Category;
}
