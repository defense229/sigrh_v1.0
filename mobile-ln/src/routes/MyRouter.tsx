import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFoud from '../pages/NotFoud';

function MyRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<NotFoud />} />
    </Routes>
  );
}

export default MyRouter;
