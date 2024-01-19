import "./App.css";
import { useEffect, useState } from "react";
import CreateTask from "./components/CreateTask";
import ListTasks from "./components/ListTasks";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const [tasks, setTasks] = useState([]);

  console.log("task are", tasks);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster />
      <div className="w-screen h-[1000px] bg-slate-900 flex flex-col items-center pt-32 gap-16  text-white">
        <h1 className="text-4xl -mb-5">Drag & Drop Todo App 📜</h1>
        <CreateTask tasks={tasks} setTasks={setTasks} />
        <ListTasks tasks={tasks} setTasks={setTasks} />
      </div>
    </DndProvider>
  );
}

export default App;
