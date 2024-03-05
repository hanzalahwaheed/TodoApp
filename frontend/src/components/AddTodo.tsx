import { useState, FormEvent, ChangeEvent } from "react";
import axios from "axios";

interface FormData {
  title: string;
  description: string;
  completed: boolean;
}
interface AddTodoProps {
  onReloadTodos: () => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ onReloadTodos }) => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    completed: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post<{ status: boolean }>(
        "http://localhost:5000/api/user/home/addtodo",
        formData,
        { withCredentials: true }
      );
      if (response) onReloadTodos();
      setFormData({
        title: "",
        description: "",
        completed: false,
      });
    } catch (error) {
      console.error("AddTodo handleSubmit:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2 mt-4">
          <div>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
              placeholder="Title"
              required
            />
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
              placeholder="Description"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add Todo
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
