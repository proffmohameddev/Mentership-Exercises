export type TodoPriority = "low" | "medium" | "high";

export type Todo = {
  _id: string;
  title: string;
  completed: boolean;
  priority: TodoPriority;
  createdAt: string;
  updatedAt?: string;
};

export type createTodoInput = {
  title: string;
  completed?: boolean;
  priority?: TodoPriority;
};

export type updateTodoInput = {
  title?: string;
  completed?: boolean;
  priority?: TodoPriority;
};