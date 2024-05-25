import React, { useState } from "react";
import { useTodo } from "../Context/TodoContext";
const TodoForm = () => {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();

    if (!todo) return;

    addTodo({ todo, completed: false });
    setTodo("");
  };

  return (
    <form onSubmit={add} className="flex items-center mb-4">
      <input
        type="text"
        placeholder="Write Todo..."
        className="flex-grow text-black px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="p-2 ml-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        Add
      </button>
    </form>
  );
};

export default TodoForm;
