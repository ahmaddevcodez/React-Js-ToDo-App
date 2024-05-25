import { useEffect, useState } from "react";
import { TodoProvider } from "./Context/TodoContext";
import { v4 as uuid } from "uuid";
import "./App.css";
import { TodoForm } from "./components";
import TodoItem from "./components/TodoItem";
import { TypewriterEffectSmooth } from "./components/ui/typewriter-effect";
import { Boxes } from "./components/ui/background-boxes";

const App = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prevTodo) => [{ id: uuid(), ...todo }, ...prevTodo]);
  };

  const updateTodo = (todo, id) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? { ...todo, id } : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((deleteTodo) => deleteTodo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="h-[100vh] overflow-y-scroll relative w-full overflow-hidden bg-slate-900 flex flex-col  ">
        <div className="absolute inset-0 w-full h-full bg-slate-900   [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

        <Boxes />
        <div className="  bg-[#17282]   z-10">
          <div className="flex flex-col items-center justify-center w-[100%] z-50">
            <TypewriterEffectSmoothDemo />
          </div>
          <div className="mx-auto container z-50">
            <div className="mb-4">
              <TodoForm />
            </div>
            <div className="flex flex-wrap gap-y-3 ">
              {todos.map((todo) => (
                <div className="w-full" key={todo.id}>
                  <TodoItem todo={todo} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TodoProvider>
  );
};

export function TypewriterEffectSmoothDemo() {
  const words = [
    { text: "Manage" },
    { text: "Your " },
    { text: "Todos" },
    { text: "with" },
    {
      text: "My ToDo App.",
      className: "text-yellow-500",
    },
  ];

  return <TypewriterEffectSmooth words={words} />;
}

export default App;
