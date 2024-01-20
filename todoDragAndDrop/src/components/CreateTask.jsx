import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

const CreateTask = ({ tasks, setTasks }) => {
  const [task, setTask] = useState({
    id: "",
    taskName: "",
    taskStatus: "todo",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task.taskName.length < 3) {
      return toast.error("A task must have at least 3 characters !");
    }
    if (task.taskName.length > 100) {
      return toast.error("A task must be with in 100 characters !");
    }

    setTasks((prev) => {
      const list = [...(prev || []), task]; // Check if prev is undefined

      localStorage.setItem("tasks", JSON.stringify(list));

      return list;
    });

    toast.success("Task Created Successfully 📜 !");

    setTask({
      id: "",
      taskName: "",
      taskStatus: "todo",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        type="text"
        placeholder="Enter a task"
        className="border-2 border-slate-300 bg-slate-200 rounded-md mr-2  md:mr-4 h-10 md:h-12 w-32 md:w-64 px-1 text-black text-xl"
        value={task.taskName}
        onChange={(e) =>
          setTask({
            ...task,
            id: uuidv4(),
            taskName: e.target.value,
          })
        }
      />
      <button className="bg-blue-500 rounded-md px-4 h-10 md:h-12 text-white">
        ✏️ Create
      </button>
    </form>
  );
};

export default CreateTask;
