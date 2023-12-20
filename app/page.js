"use client";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

import Task from "./components/Task";

import { FcTodoList } from "react-icons/fc";
import { GoPlus } from "react-icons/go";

import AddModal from "./components/AddModal";

import "react-loading-skeleton/dist/skeleton.css";

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    await fetch("http://localhost:3001/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const completeHandler = async (id) => {
    const taskToUpdate = tasks.find((task) => task.id === id);
    const updatedTask = {
      ...taskToUpdate,
      isCompleted: !taskToUpdate.isCompleted,
  };

    await fetch(`http://localhost:3001/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    fetchData();
  };

  const removeHandler = async (id) => {
    await fetch(`http://localhost:3001/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    fetchData();
  };

  return (
    <>
      <div
        data-theme={isDark ? "dark" : "light"}
        className="w-full h-screen flex justify-center items-center duration-300 p-5 lg:p-0"
      >
        <div
          className={`relative w-full lg:w-1/2 h-fit flex flex-col items-center gap-8 rounded-xl shadow-xl p-4 duration-300 ${
            isDark ? "bg-neutral-800" : "bg-slate-300"
          } `}
        >
          <label className="swap swap-rotate absolute right-5 top-5">
            <input
              type="checkbox"
              className="theme-controller"
              value="synthwave"
              onClick={() => setIsDark((prev) => !prev)}
            />
            <svg
              className="swap-on fill-current w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>
            <svg
              className="swap-off fill-current w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
          <div className="flex items-center gap-3 mt-2">
            <h2 className="font-bold text-2xl">ToDoList</h2>
            <FcTodoList size={25} />
          </div>
          <button
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="w-full px-6 py-2 text-white bg-green-600 rounded-xl shadow-xl animate-bounce flex items-center justify-center gap-1"
          >
            <span>Add new Task</span>
            <GoPlus size={25} />
          </button>
          <h2
            className={`w-full z-40 font-bold italic text-xl ${
              isDark ? "text-white" : "text-black"
            } relative after:absolute after:top-3 after:left-0 after:w-1/3 after:h-1 after:bg-gradient-to-r after:from-red-600 after:to-transparent after:-z-50 after:rounded-xl after:opacity-50`}
          >
            Tasks
          </h2>
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2">
            {loading ? (
              <>
                <Skeleton className="animate-pulse" count={2} />
                <Skeleton className="animate-pulse" count={2} />
                <Skeleton className="animate-pulse" count={2} />
              </>
            ) : (
              tasks &&
              tasks.map((task) => (
                <Task
                  key={task.id}
                  task={task}
                  isDark={isDark}
                  completeHandler={completeHandler}
                  removeHandler={removeHandler}
                  fetchData={fetchData}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <AddModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        isDark={isDark}
        tasks={tasks}
        setTasks={setTasks}
        fetchData={fetchData}
      />
    </>
  );
}
