import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import Sidebar from "./Sidebar";
import TaskList from "./TaskList";

const MainView = () => {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [newTask, setNewTask] = useState("");
    const [pockets, setPockets] = useState(() => {
        const savedPockets = localStorage.getItem("pockets");
        return savedPockets ? JSON.parse(savedPockets) : [];
    });
    const [currentPocket, setCurrentPocket] = useState(null);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem("pockets", JSON.stringify(pockets));
        if (currentPocket && !pockets.some(pocket => pocket.name === currentPocket.name)) {
            setCurrentPocket(null);
        }
        if (!currentPocket && pockets.length > 0) {
            setCurrentPocket(pockets[0]);
        }
    }, [pockets]);

    const addTask = () => {
        if (newTask.trim() !== "") {
            const newTaskObject = {
                id: Date.now(),
                text: newTask,
                completed: false,
                pocket: currentPocket.name, // Change this line
            };
            setTasks((prevTasks) => [...prevTasks, newTaskObject]);
            setNewTask("");
        }
    };

    const toggleTaskCompletion = (id) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const deleteTasksForPocket = (pocketName) => {
        setTasks((prevTasks) => prevTasks.filter(task => task.pocket !== pocketName));
    };

    const editTask = (id) => {
        const newTaskText = prompt("Edit task:");
        if (newTaskText !== null) {
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === id ? { ...task, text: newTaskText } : task
                )
            );
        }
    };

    const deleteTask = (id) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    };

    return (
        <div className="flex h-svh">
            <Sidebar
                pockets={pockets}
                setPockets={setPockets}
                setCurrentPocket={setCurrentPocket}
                currentPocket={currentPocket}
                deleteTasksForPocket={deleteTasksForPocket} // Ensure this line is correct
            />
            <TaskList
                tasks={tasks}
                newTask={newTask}
                setNewTask={setNewTask}
                addTask={addTask}
                toggleTaskCompletion={toggleTaskCompletion}
                currentPocket={currentPocket}
                editTask={editTask}
                deleteTask={deleteTask}
            />
        </div>
    );
};

export default MainView;
