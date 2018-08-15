
export interface User {
  email: string;
  password: string;
  name?: string;
}

export interface Order {
  name: string;
  description: string;
  count: number;
  price: number;
}

export interface Category {
  title: string;
  body: string;
  imageSrc: string;
  user?: string;
  _id?: string;
}

export interface Message {
  message: string;
}

