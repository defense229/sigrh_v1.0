import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CandidateDetails from '../pages/defrecrut/candidates/CandidateDetails';
import CandidatesAbsent from '../pages/defrecrut/candidates/CandidatesAbsent';
import CandidatesAccepted from '../pages/defrecrut/candidates/CandidatesAccepted';
import CandidatesAll from '../pages/defrecrut/candidates/CandidatesAll';
import CandidatesPresent from '../pages/defrecrut/candidates/CandidatesPresent';
import CandidatesRejected from '../pages/defrecrut/candidates/CandidatesRejected';
import CandidateSportAccept from '../pages/defrecrut/candidates/CandidatesSportAccept';
import CandidatesSportReject from '../pages/defrecrut/candidates/CandidatesSportReject';
import Dec from '../pages/defrecrut/dec/Dec';
import AddScore from '../pages/defrecrut/details/scores/AddScore';
import UnanonymousList from '../pages/defrecrut/details/scores/UnanonymousList';
import Exams from '../pages/defrecrut/exams/Exams';
import ExamWindow from '../pages/defrecrut/exams/ExamWindow';
import FileCollect from '../pages/defrecrut/fileCollect/FileCollect';
import GlobalVue from '../pages/defrecrut/global/GlobalVue';
import HealthControl from '../pages/defrecrut/healthControl/HealthControl';
import CandidateSettings from '../pages/defrecrut/settings/candidates/CandidateSettings';
import CentersSettings from '../pages/defrecrut/settings/centers/CentersSettings';
import DepartementSettings from '../pages/defrecrut/settings/departements/DepartementSettings';
import FieldsSettings from '../pages/defrecrut/settings/fields/FieldsSettings';
import Settings from '../pages/defrecrut/settings/Settings';
import Sport from '../pages/defrecrut/sport/Sport';
import Users from '../pages/defrecrut/users/Users';
import Writing from '../pages/defrecrut/writing/Writing';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFoud from '../pages/NotFoud';

function MyRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="home" element={<Home />} />
      <Route path="exams" element={<Exams />} />
      <Route path="exam/:id" element={<ExamWindow />}>
        <Route index element={<GlobalVue />} />
        <Route path="file-collect" element={<FileCollect />}>
          <Route index element={<CandidatesAll />} />
          <Route path="accepted" element={<CandidatesAccepted />} />
          <Route path="rejected" element={<CandidatesRejected />} />
        </Route>
        <Route path="sport" element={<Sport />}>
          <Route index element={<CandidatesPresent />} />
          <Route path="absents" element={<CandidatesAbsent />} />
          <Route path="accepted" element={<CandidateSportAccept />} />
          <Route path="rejected" element={<CandidatesSportReject />} />
        </Route>
        <Route path="dec" element={<Dec />} />
        <Route path="writing" element={<Writing />} />
        <Route path="health-control" element={<HealthControl />} />
        <Route path="settings" element={<Settings />}>
          <Route index element={<CandidateSettings />} />
          <Route path="departements" element={<DepartementSettings />} />
          <Route path="centers" element={<CentersSettings />} />
          <Route path="fields" element={<FieldsSettings />} />
        </Route>
        <Route path="users" element={<Users />} />
        <Route path="candidate/:candidateId" element={<CandidateDetails />} />
      </Route>
      <Route path="add-score" element={<AddScore />} />
      <Route path="unanonym-list" element={<UnanonymousList />} />
      <Route path="*" element={<NotFoud />} />
    </Routes>
  );
}

export default MyRouter;
