import React, { useState } from "react";
import { useTodo } from "../Context/TodoContext";

const TodoItem = ({ todo }) => {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  const handleEditClick = () => {
    if (todo.completed) return;

    if (isTodoEditable) {
      updateTodo(todo.id, { ...todo, todo: todoMsg });
    }
    setIsTodoEditable((prev) => !prev);
  };

  const handleDeleteClick = () => {
    deleteTodo(todo.id);
  };

  const handleCheckboxChange = () => {
    toggleComplete(todo.id);
  };

  return (
    <div
      className={`flex items-center border border-gray-300 rounded-lg px-4 py-2 gap-x-3 shadow-sm transition duration-300 text-gray-800 
      ${todo.completed ? "bg-green-100" : "bg-purple-100"}`}
    >
      <input
        type="checkbox"
        className="cursor-pointer h-5 w-5 text-green-500 focus:ring-green-400"
        checked={todo.completed}
        onChange={handleCheckboxChange}
      />
      <input
        type="text"
        className={`border-2 outline-none w-full bg-transparent rounded-lg px-2 py-1 transition duration-300 
        ${isTodoEditable ? "border-gray-300" : "border-transparent"} 
        ${todo.completed ? "line-through text-gray-500" : "text-gray-800"}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      {/* Edit/Save Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-gray-300 justify-center items-center bg-white hover:bg-gray-100 transition duration-300 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleEditClick}
        disabled={todo.completed}
      >
        {isTodoEditable ? "💾" : "✏️"}
      </button>
      {/* Delete Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-gray-300 justify-center items-center bg-white hover:bg-red-100 transition duration-300 text-red-500 shrink-0"
        onClick={handleDeleteClick}
      >
        ❌
      </button>
    </div>
  );
};

export default TodoItem;
