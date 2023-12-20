"use client";
import React, { useState } from "react";

export default function EditModal({
  isModalOpen,
  setIsModalOpen,
  isDark,
  task,
  fetchData,
}) {
  const [input, setInput] = useState(task.name);

  const updateHandler = async (id) => {
    if (input !== "") {
      await fetch(`http://localhost:3001/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: task.id,
          name: input,
          isCompleted: task.isCompleted,
        }),
      });
      await fetchData();
      setIsModalOpen(false);
    } else {
      return;
    }
  };

  return (
    <>
      <div
        className={`duration-200 ${
          isModalOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } w-full h-screen fixed inset-0 z-50 flex justify-center items-center bg-[#000] bg-opacity-75 p-5 lg:p-0`}
      >
        <div
          className={`flex flex-col items-center gap-8 ju w-full lg:w-1/3 h-fit ${
            isDark ? "bg-neutral-700" : "bg-slate-200"
          } p-5 rounded-xl shadow-xl ${
            isModalOpen ? "scale-100" : "scale-0"
          } duration-200`}
        >
          <h2 className={`font-bold  ${isDark ? "text-white" : "text-black"}`}>
            Edit The Task
          </h2>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={`w-full px-2 py-2 outline-none placeholder:text-sm rounded-xl bg-transparent border border-solid ${
              isDark
                ? "border-slate-100 text-white"
                : "border-gray-500 text-black"
            } `}
            type="text"
            placeholder="Enter the name of task"
          />
          <div className="w-full flex justify-center gap-3">
            <button
              onClick={() => updateHandler(task.id)}
              className={`w-1/2 px-6 py-2 bg-green-600 rounded-xl text-white`}
            >
              Update
            </button>
            <button
              onClick={() => setIsModalOpen(!isModalOpen)}
              className={`w-1/2 px-6 py-2 bg-red-600 rounded-xl text-white`}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
