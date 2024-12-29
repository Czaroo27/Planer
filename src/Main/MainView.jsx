import React, { useState } from "react";
import "./style.css"; // Wspólny plik CSS dla stylów

const MainView = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Clean up the kitchen", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      const newTaskObject = {
        id: Date.now(), // Unikalny identyfikator
        text: newTask,
        completed: false,
      };

      // Dodajemy nowe zadanie do istniejącej listy zadań
      setTasks((prevTasks) => [...prevTasks, newTaskObject]);

      setNewTask(""); // Czyszczenie pola tekstowego
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="main-view">
      <div className="sidebar-nav">
        <div className="frame">
          <div className="text-wrapper">Pockets</div>
          <div className="div">
            <div className="frame-2">
              <div className="frame-3">
                <div className="text-wrapper-2">🏠</div>
                <div className="text-wrapper-3">Home</div>
              </div>
              <div className="div-wrapper">
                <div className="text-wrapper-4">{tasks.length}</div>
              </div>
            </div>
            <div className="frame-4">
              <div className="frame-3">
                <div className="text-wrapper-2">🥦</div>
                <div className="text-wrapper-5">Diet</div>
              </div>
              <div className="frame-5">
                <div className="text-wrapper-6">15</div>
              </div>
            </div>
          </div>
          <div className="frame-6">
            <div className="frame-7">
              <div className="text-wrapper-7">+</div>
              <div className="text-wrapper-8">Create new pocket</div>
            </div>
            <div className="frame-8">
              <img className="img" src="img/frame-10.svg" alt="Frame 10" />
              <div className="frame-9">
                <div className="text-wrapper-9">P</div>
              </div>
            </div>
          </div>
        </div>
        <div className="profile">
          <img className="rectangle" src="img/rectangle-1.svg" alt="Profile" />
          <div className="frame-10">
            <div className="text-wrapper-10">Claudia Doumit</div>
            <div className="text-wrapper-11">Log out</div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="frame-11">
        <div className="frame-12">
          <div className="frame-13">
            <p className="home">
              <span className="span">🏠 </span>
              <span className="text-wrapper-12">Home</span>
            </p>
            <p className="p">
              Remaining {tasks.filter((t) => !t.completed).length} from{" "}
              {tasks.length} tasks.
            </p>
          </div>
          <div className="frame-14">
            <button className="button">
              <div className="text-wrapper-13">Show completed</div>
            </button>
          </div>
        </div>
        <div className="frame-15">
          {tasks.map((task) => (
            <div className="task" key={task.id}>
              <div className="frame-16">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                />
                <div
                  className={
                    task.completed
                      ? "text-wrapper-14 completed"
                      : "text-wrapper-14"
                  }
                >
                  {task.text}
                </div>
              </div>
              <img className="frame-17" src="img/frame-19.svg" alt="Options" />
            </div>
          ))}
          <div className="create-task-baner">
            <div className="frame-14">
              <img
                className="ph-caret-down-light"
                src="img/ph-caret-down-light.svg"
                alt="Expand"
              />
              <input
                type="text"
                className="task-input"
                placeholder="Enter new task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <button className="add-task-button" onClick={addTask}>
                Add Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainView;
