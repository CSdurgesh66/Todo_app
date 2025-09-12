import React, { useState } from "react";
import TodoApp from "./TodoApp";
import Signup from '../components/signup';
import Login from '../components/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/todos" element={<TodoApp />} />
      </Routes>
    </Router>
  )

}

export default App;

