export interface Product {
  id: number;
  preview: string;
  title: string;
  subtitle?: string;
  price: number;
  availability: boolean;
}

export interface CustomProducts {
  id: number;
  preview: string;
  images: string[];
  title: string;
  subtitle?: string;
  price: number;
  description?: string;
  colors?: string[];
  sizes?: string[];
  models?: string[];
  stickerNumbers?: number[];
  availability: boolean;
}

export interface YourDesignProducts {
  id: number;
  title: string;
  description: string;
  products: CustomProducts[];
}
