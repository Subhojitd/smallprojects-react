"use client";
import React from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
const page = () => {
  return (
    <>
      {/* Body */}
      <div class="h-screen bg-[#c7d2fe] w-full flex justify-center items-center ">
        {/* Todo-wrapper */}
        <div class=" w-96 h-[600px] flex justify-center items-center flex-col relative">
          {/* Header*/}
          <div className="bg-[#4f46e5] w-full h-16 flex items-center justify-center rounded-t-lg rounded-b-sm shadow-md  ">
            <h1 className="text-white text-2xl font-semibold">All Tasks</h1>
          </div>
          <div className="w-full h-10 my-2 flex items-center justify-center">
            <div className="w-1/3 h-full bg-white mr-1 rounded-md flex items-center justify-center   cursor-pointer hover:bg-[#a5b4fc] shadow-md">Completed</div>
            <div className="w-1/3 h-full bg-white mx-1 rounded-md flex items-center justify-center cursor-pointer hover:bg-[#a5b4fc] shadow-md">All Taskes</div>
            <div className="w-1/3 h-full bg-white ml-1 rounded-md flex items-center justify-center cursor-pointer hover:bg-[#a5b4fc] shadow-md">Remaining</div>
          </div>
          {/* mid section */}
          <div className="w-full h-[450px] bg-white  rounded-md shadow-md p-3 ">
            <div className="flex items-center justify-evenly bg-[#a5b4fc] p-3 mb-2 rounded-md shadow-md">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className="w-5 h-5"
            />
            <p>Go to Gym</p>
            <DeleteForeverIcon/>
            </div>
          </div>
          <button className="bg-[#4f46e5] w-36 text-white rounded-full shadow-lg   h-12 absolute bottom-[-4px] flex items-center justify-center gap-1 ">
            <AddIcon/>New Task
          </button>
        </div>
      </div>
    </>
  );
};

export default page;
