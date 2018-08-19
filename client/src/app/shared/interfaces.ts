
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
  name: string;
  _id?: string;
  category: [
    {
      title: string;
      imageSrc: string;
      user?: string;
      _id?: string;
    }
  ];
}

export interface Message {
  message: string;
}

export interface Positions {
  name: string;
  body: string;
  cost: number;
  category: string;
  user?: string;
  _id?: string;
  quantity?: number;
}

