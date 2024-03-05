import React, { useState } from "react";
import axios from "axios";

interface Todo {
  title: string;
  description: string;
  completed: boolean;
  _id: string;
}

interface TodosProps {
  todos: Todo[];
  onReloadTodos: () => void;
}

const Todos: React.FC<TodosProps> = ({ todos, onReloadTodos }) => {
  const handleMarkAsDone = async (todoId: string) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/home/markasdone",
        {todoId},
        { withCredentials: true }
      );

      console.log(response);
      if (response.data.status) onReloadTodos();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
      {todos.map((todo, index) => (
        <div
          className="max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2 mt-4 flex flex-col justify-between"
          key={index}
        >
          <div>
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {todo.title}
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {todo.description}
            </p>
          </div>
          {!todo.completed && <a
            onClick={() => handleMarkAsDone(todo._id)}
            className="w-max inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Mark as Done
          </a>}
        </div>
      ))}
    </div>
  );
};

export default Todos;
