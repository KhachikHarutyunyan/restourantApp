
export interface User {
  email: string;
  password: string;
  name?: string;
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

export interface Order {
  date?: Date;
  order?: number;
  user?: string;
  list: any[];
  _id?: string;
}

export interface OrderPosition {
  name: string;
  cost: number;
  quantity: number;
  _id?: string;
}

export interface Filter {
  start?: Date;
  end?: Date;
  order?: number;
}

export interface OverviewPage {
  orders: OverviewPageItem;
  gain: OverviewPageItem;
}

export interface OverviewPageItem {
  percent: number;
  compare: number;
  yesterday: number;
  isHigher: boolean;
}

export interface AnalyticsPage {
  average: number;
  chart: AnalyticsChart[];
}

export interface AnalyticsChart {
  gain: number;
  order: number;
  label: string;
}

export interface UserOrder {
  name: string;
  surname: string;
  telephon: string;
  email: string;
  street: string;
  payment: string;
  orders: Array<OrderPosition>;
  order?: number;
  date?: Date;
  userId?: string;
  _id?: string;
}

