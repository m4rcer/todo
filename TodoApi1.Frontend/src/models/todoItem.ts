export enum TodoSteps {
  Uncomplete,
  InProgress,
  Complete,
}

export interface TodoItem {
  id: number;
  name: string;
  todoStep: TodoSteps;
  orderId: number;
}

