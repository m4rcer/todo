export enum TodoSteps {
  Uncomplete,
  InProgress,
  Complete,
}

export enum Categories {
  NoCategory,
  Home,
  Work,
  Entertaiment,
}

export interface TodoItem {
  id: number;
  name: string;
  todoStep: TodoSteps;
  description: string;
  creationDate: Date;
  category: Categories;
  orderId: number;
}
