import React, { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import toast from "react-hot-toast";

const ListTasks = ({ tasks, setTasks }) => {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const filteredTodos = tasks.filter((e) => e.taskStatus === "todo");
    const filteredProgress = tasks.filter((e) => e.taskStatus === "inProgress");
    const filteredCompleted = tasks.filter((e) => e.taskStatus === "completed");

    setTodos(filteredTodos);
    setInProgress(filteredProgress);
    setCompleted(filteredCompleted);
  }, [tasks]);

  const statuses = ["todo", "inProgress", "completed"];

  return (
    <div className="flex gap-16">
      {statuses.map((status, index) => (
        <Section
          key={index}
          status={status}
          tasks={tasks}
          setTasks={setTasks}
          todos={todos}
          inProgress={inProgress}
          completed={completed}
        />
      ))}
    </div>
  );
};

export default ListTasks;

const Section = ({ status, tasks, setTasks, todos, inProgress, completed }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  let text = "📝Todo ";
  let bg = "bg-slate-500";
  let tasksToMap = todos;

  if (status === "inProgress") {
    text = "⌛In Progress ";
    bg = "bg-purple-500";
    tasksToMap = inProgress;
  }

  if (status === "completed") {
    text = "✅Completed";
    bg = "bg-emerald-500";
    tasksToMap = completed;
  }

  const addItemToSection = (id) => {
    setTasks((prev) => {
      const mTasks = prev.map((t) => {
        if (t.id === id) {
          return { ...t, taskStatus: status };
        }
        return t;
      });

      localStorage.setItem("tasks", JSON.stringify(mTasks));

      toast("Task status changed", { icon: "😁" });
      return mTasks;
    });
  };

  return (
    <div
      ref={drop}
      className={`w-64 h-full rounded-md p-2 ${isOver ? "bg-slate-200" : ""}`}
    >
      <Header text={text} bg={bg} count={tasksToMap.length} />

      {tasksToMap.length > 0 &&
        tasksToMap.map((task) => (
          <SingleTask
            key={task.id}
            task={task}
            tasks={tasks}
            setTasks={setTasks}
          />
        ))}
    </div>
  );
};

const Header = ({ text, bg, count }) => {
  return (
    <div
      className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white  `}
    >
      {text}
      <div className="ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center">
        {count}
      </div>
    </div>
  );
};

const SingleTask = ({ task, tasks, setTasks }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleRemove = (id) => {
    const fTasks = tasks.filter((t) => t.id !== id);

    localStorage.setItem("tasks", JSON.stringify(fTasks));

    setTasks(fTasks);

    toast("Task Removed ", { icon: "❌" });
  };
  return (
    <div
      ref={drag}
      className={` p-4 mt-8 shadow-md rounded-md cursor-grab bg-white text-black flex items-center justify-between ${
        isDragging ? "opacity-25" : "opaacity-100"
      }`}
    >
      <p>{task.taskName}</p>
      <button className="text-slate-400" onClick={() => handleRemove(task.id)}>
        ❌
      </button>
    </div>
  );
};
