import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login/Login/Login";
import Register from "./Login/Register/Register";
import MainView from "./Main/MainView";

function App() {
  return (
    <div className="App">
      <MainView />
      <Router>
        <Routes>
          <Route path="/main" element={<MainView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
