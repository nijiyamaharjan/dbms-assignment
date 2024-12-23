import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import UserForm from "./components/UserForm";
import Profile from "./components/Profile"
import AdminDashboard from './components/AdminDashboard'
import Login from "./components/Login";

const App = () => {
  
  return (
    <>
    <BrowserRouter>   
          <div className="p-0 max-h-screen">
            <Routes>
              <Route path="/" element={<UserForm />} />
              <Route path="/user-profile/:id" element={<Profile />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
      </BrowserRouter>
    </>
  );
};

export default App;
