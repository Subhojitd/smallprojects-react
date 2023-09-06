"use client"
import React, { useState } from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';

const Page = () => {
  const [showModal, setShowModal] = useState(false);
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState([]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleAddTask = () => {
    // Add the new task to the tasks array
    if (taskText.trim() !== '') {
      setTasks([...tasks, taskText]);
      setTaskText('');
      closeModal();
    }
  };

  const toggleCompleted = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <>
      {/* Body */}
      <div className="h-screen bg-[#c7d2fe] w-full flex justify-center items-center ">
        {/* Todo-wrapper */}
        <div className="w-96 h-[600px] flex justify-center items-center flex-col relative">
          {/* Header */}
          <div className="bg-[#4f46e5] w-full h-16 flex items-center justify-center rounded-t-lg rounded-b-sm shadow-md  ">
            <h1 className="text-white text-2xl font-semibold">All Tasks</h1>
          </div>
          <div className="w-full h-10 my-2 flex items-center justify-center">
            <div className="w-1/3 h-full bg-white mr-1 rounded-md flex items-center justify-center   cursor-pointer hover:bg-[#a5b4fc] shadow-md">Completed</div>
            <div className="w-1/3 h-full bg-white mx-1 rounded-md flex items-center justify-center cursor-pointer hover.bg-[#a5b4fc] shadow-md">All Tasks</div>
            <div className="w-1/3 h-full bg-white ml-1 rounded-md flex items-center justify-center cursor-pointer hover.bg-[#a5b4fc] shadow-md">Remaining</div>
          </div>
          {/* mid section */}
          <div className="w-full h-[450px] bg-white  rounded-md shadow-md p-3 ">
            {tasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between bg-[#a5b4fc] p-3 mb-2 rounded-md shadow-md">
                <input
                  id={`checkbox-${index}`}
                  type="checkbox"
                  value=""
                  className="w-5 h-5"
                  onChange={() => toggleCompleted(index)}
                />
                <p>{task}</p>
                <DeleteForeverIcon />
              </div>
            ))}
          </div>
          <button className="bg-[#4f46e5] w-36 text-white rounded-full shadow-lg   h-12 absolute bottom-[-4px] flex items-center justify-center gap-1 " onClick={openModal}>
            <AddIcon />New Task
          </button>
        </div>
      </div>
      {/* Modal for Adding Task */}
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-96 p-4 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-2">Add New Task</h2>
            <input
              type="text"
              placeholder="Enter task"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              className="w-full p-2 rounded-md mb-2"
            />
            <div className="flex justify-end">
              <button
                className="bg-[#4f46e5] text-white px-4 py-2 rounded-md"
                onClick={handleAddTask}
              >
                Add Task
              </button>
              <button
                className="ml-2 bg-gray-300 px-4 py-2 rounded-md"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
