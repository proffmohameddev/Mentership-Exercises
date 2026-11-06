import { ObjectId } from "mongodb";
import {
  createTodoInput,
  Todo,
  updateTodoInput,
} from "../types/todo";
import { getTodoCollection } from "./db";

export async function fetchTodos(): Promise<Todo[]> {
  try {
    const collection = await getTodoCollection();

    const todos = await collection.find().toArray();

    return todos.map((todo) => ({
      _id: todo._id.toString(),
      title: todo.title,
      completed: todo.completed,
      priority: todo.priority ?? "medium",
      createdAt:
        todo.createdAt?.toISOString() || new Date().toISOString(),
      updatedAt: todo.updatedAt?.toISOString(),
    }));
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
}

export async function fetchTodoById(
  id: string
): Promise<Todo | null> {
  try {
    const collection = await getTodoCollection();

    const todo = await collection.findOne({
      _id: new ObjectId(id),
    });

    if (!todo) {
      return null;
    }

    return {
      _id: todo._id.toString(),
      title: todo.title,
      completed: todo.completed,
      priority: todo.priority ?? "medium",
      createdAt:
        todo.createdAt?.toISOString() || new Date().toISOString(),
      updatedAt: todo.updatedAt?.toISOString(),
    };
  } catch (error) {
    console.error("Error fetching todo by id:", error);
    return null;
  }
}

export async function createTodo(
  todo: createTodoInput
): Promise<string | null> {
  try {
    const collection = await getTodoCollection();

    const todoWithPriority = {
      ...todo,
      priority: todo.priority ?? "medium",
    };

    const result = await collection.insertOne(todoWithPriority);

    return result.insertedId.toString();
  } catch (error) {
    console.error("Error creating todo:", error);
    return null;
  }
}

export async function updateTodo(
  id: string,
  todo: updateTodoInput
): Promise<boolean> {
  try {
    const collection = await getTodoCollection();

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: todo,
      }
    );

    return result.modifiedCount > 0;
  } catch (error) {
    console.error("Error updating todo:", error);
    return false;
  }
}

export async function deleteTodo(id: string): Promise<boolean> {
  try {
    const collection = await getTodoCollection();

    const result = await collection.deleteOne({
      _id: new ObjectId(id),
    });

    return result.deletedCount > 0;
  } catch (error) {
    console.error("Error deleting todo:", error);
    return false;
  }
}