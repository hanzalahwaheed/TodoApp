import { useEffect, useState } from "react";
import axios from "axios";

const Todos = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/user/home", {
        withCredentials: true,
      });
      setTasks(response.data.todos);
    } catch (error) {
      console.log("Error in getting todos", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="">
      {tasks.map((task, index) => (
        <div key={index}>
          <h1>{task.title}</h1>
          <h1>{task.description}</h1>
          <h1>{task.completed}</h1>
        </div>
      ))}
    </div>
  );
};

export default Todos;
