import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Admin from '../pages/defrecrut/Admin';
import Candidates from '../pages/defrecrut/details/Candidates';
import ExamCenters from '../pages/defrecrut/details/ExamCenters';
import Fields from '../pages/defrecrut/details/Fields';
import AddScore from '../pages/defrecrut/details/scores/AddScore';
import UnanonymousList from '../pages/defrecrut/details/scores/UnanonymousList';
import Exams from '../pages/defrecrut/Exams';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFoud from '../pages/NotFoud';

function MyRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="home" element={<Home />} />
      <Route path="defrecrut" element={<Admin />}>
        <Route index element={<Exams />} />
        <Route path="canndidates" element={<Candidates />} />
        <Route path="centers" element={<ExamCenters />} />
        <Route path="fields" element={<Fields />} />
      </Route>
      <Route path="add-score" element={<AddScore />} />
      <Route path="unanonym-list" element={<UnanonymousList />} />
      <Route path="*" element={<NotFoud />} />
    </Routes>
  );
}

export default MyRouter;
