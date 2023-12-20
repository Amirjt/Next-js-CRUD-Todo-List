"use client";
import React, { useState } from "react";

import { ImCheckboxUnchecked } from "react-icons/im";
import { ImCheckboxChecked } from "react-icons/im";
import { CiCircleRemove } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";

import EditModal from "./EditModal";

export default function Task({
  task,
  isDark,
  completeHandler,
  removeHandler,
  fetchData,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div
        className={`${
          task.isCompleted ? "opacity-50" : ""
        }  w-full flex justify-between items-center ${
          isDark
            ? "bg-indigo-700 text-white"
            : "border border-solid border-gray-500"
        }  p-3 rounded-xl duration-100`}
      >
        <div
          className="cursor-pointer"
          onClick={() => completeHandler(task.id)}
        >
          {task.isCompleted ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
        </div>
        <span className={`${task.isCompleted ? "line-through" : ""}`}>
          {task.name}
        </span>
        <div className="flex items-center gap-3">
          <CiCircleRemove
            onClick={() => removeHandler(task.id)}
            className="cursor-pointer"
            size={22}
          />
          <FiEdit
            className="cursor-pointer"
            onClick={() => setIsModalOpen(!isModalOpen)}
            size={20}
          />
        </div>
      </div>
      <EditModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isDark={isDark}
        task={task}
        fetchData={fetchData}
      />
    </>
  );
}
