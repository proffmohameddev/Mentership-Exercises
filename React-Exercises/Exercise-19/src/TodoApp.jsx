import { useReducer, useState } from "react";

const inisialState = [];

const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    case "toggle":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo,
      );
    case "delete":
      return state.filter((todo) => todo.id !== action.payload);

    default:
      return state;
  }
};

const TodoApp = () => {
  const [state, dispach] = useReducer(reducer, inisialState);

  const [text, setText] = useState("");

  const handleAdd = () => {
    if (text.trim()) {
      const newTodo = {
        id: Date.now(),
        text,
        completed: false,
      };

      dispach({ type: "add", payload: newTodo });
      setText("");
    }
  };

  return (
    <>
      <h2>Todo App</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter A New Todo"
      />

      <button onClick={handleAdd}>Add</button>

      <ul>
        {state.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none ",
              }}
              onClick={() => dispach({ type: "toggle", payload: todo.id })}
            >
              {todo.text}
            </span>
            <button
              onClick={() => dispach({ type: "delete", payload: todo.id })}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoApp;
