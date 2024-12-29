import React, { useEffect, useState } from "react";
import NoPockets from "./NoPockets";
import { IoMdSend } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';
import { FaRegTrashCan } from 'react-icons/fa6';

const TaskList = ({ tasks, newTask, setNewTask, addTask, toggleTaskCompletion, currentPocket, editTask, deleteTask }) => {
    useEffect(() => {
        if (!currentPocket) {
            setNewTask("");
        }
    }, [currentPocket]);

    if (!currentPocket) {
        return <NoPockets />;
    }

    const filteredTasks = tasks.filter(task => task.pocket === currentPocket.name);

    return (
        <div className="flex flex-col w-full p-10 h-full bg-gray-100">
            <div className="flex flex-col justify-between h-full">
                <div>
                    <div className='flex justify-between items-center w-full'>
                        <div className="mb-4">
                            <div className="flex items-center">
                                <div className="text-2xl">{currentPocket.icon}</div>
                                <div className="ml-2 text-xl">{currentPocket.name}</div>
                            </div>
                            <div className="mt-2"></div>
                            Remaining {filteredTasks.filter((t) => !t.completed).length} from {filteredTasks.length} tasks.
                        </div>
                    </div>

                    <div className="mb-4"></div>
                    <div className='bg-white rounded-md'>
                        {filteredTasks.length > 0 ? (
                            filteredTasks.map((task) => (
                                <div className="border p-2 mb-2 flex items-center justify-between group" key={task.id}>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={task.completed}
                                            onChange={() => toggleTaskCompletion(task.id)}
                                            className="mr-2"
                                        />
                                        <div className={task.completed ? "line-through" : ""}>{task.text}</div>
                                    </div>
                                    <div className="flex items-center opacity-0 group-hover:opacity-100">
                                        <button
                                            onClick={() => editTask(task.id)}
                                            className="ml-2 bg-yellow-500 text-white px-2 py-1 rounded"
                                        >
                                            <MdEdit />
                                        </button>
                                        <button
                                            onClick={() => deleteTask(task.id)}
                                            className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                                        >
                                            <FaRegTrashCan />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No tasks available. Add tasks to this pocket below.</p>
                        )}
                    </div>
                </div>

                <div className='flex justify-center items-center w-full'>
                    <div className="flex items-center gap-2 w-1/2">
                        <input
                            type="text"
                            placeholder="Enter new task..."
                            className='bg-[#dfdfdf] w-full px-4 py-2 h-12 rounded-full text-black placeholder-black'
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    addTask();
                                }
                            }}
                        />

                        <button
                            disabled={newTask.trim() === ""}
                            onClick={addTask}
                            className={`text-white px-4 py-2 rounded-full duration-150 ${newTask.trim() === "" ? 'bg-gray-400' : 'bg-blue-500'}`}
                        >
                            <IoMdSend fontSize={26} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskList;
