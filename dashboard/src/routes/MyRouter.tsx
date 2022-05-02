import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ExamLn from '../pages/defrecrut-ln/exams/ExamLn';
import ExamLnWindow from '../pages/defrecrut-ln/exams/ExamLnWindow';
import CandidatesLn from '../pages/defrecrut-ln/global/candidats/CandidatesLn';
import DepartementsLn from '../pages/defrecrut-ln/global/departement/DepartementsLn';
import GlobalVueLn from '../pages/defrecrut-ln/global/GlobalVueLn';
import Jury from '../pages/defrecrut-ln/global/jury/Jury';
import JuryMembers from '../pages/defrecrut-ln/global/jury-members/JuryMembers';
import QuestionsLn from '../pages/defrecrut-ln/global/questions/QuestionsLn';
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
import QrCodes from '../pages/defrecrut/details/scores/QrCodes';
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
import Writing from '../pages/defrecrut/writing/Writing';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFoud from '../pages/NotFoud';
import ResultLn from '../pages/defrecrut-ln/global/ResultLn';
import SetttingsLn from '../pages/defrecrut-ln/global/settings/SetttingsLn';

function MyRouter() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='home' element={<Home />} />
      <Route path='exams' element={<Exams />} />
      <Route path='exam/:id' element={<ExamWindow />}>
        <Route index element={<GlobalVue />} />
        <Route path='file-collect' element={<FileCollect />}>
          <Route index element={<CandidatesAll />} />
          <Route path='accepted' element={<CandidatesAccepted />} />
          <Route path='rejected' element={<CandidatesRejected />} />
        </Route>
        <Route path='sport' element={<Sport />}>
          <Route index element={<CandidatesPresent />} />
          <Route path='absents' element={<CandidatesAbsent />} />
          <Route path='accepted' element={<CandidateSportAccept />} />
          <Route path='rejected' element={<CandidatesSportReject />} />
        </Route>
        <Route path='dec' element={<Dec />} />
        <Route path='writing' element={<Writing />} />
        <Route path='health-control' element={<HealthControl />} />
        <Route path='settings' element={<Settings />}>
          <Route index element={<CandidateSettings />} />
          <Route path='departements' element={<DepartementSettings />} />
          <Route path='centers' element={<CentersSettings />} />
          <Route path='fields' element={<FieldsSettings />} />
        </Route>
        <Route path='candidate/:candidateId' element={<CandidateDetails />} />
        <Route path='add-score/:field' element={<AddScore />} />
        <Route path='qrcodes/:center' element={<QrCodes />} />
      </Route>
      <Route path='exams-ln' element={<ExamLn />} />
      <Route path='exam-ln/:id' element={<ExamLnWindow />}>
        <Route index element={<GlobalVueLn />} />
        <Route path='departement' element={<DepartementsLn />} />
        <Route path='jury' element={<Jury />} />
        <Route path='jury-members' element={<JuryMembers />} />
        <Route path='candidate' element={<CandidatesLn />} />
        <Route path='question' element={<QuestionsLn />} />
        <Route path='results' element={<ResultLn />} />
        <Route path='settings' element={<SetttingsLn />} />
      </Route>
      <Route path='*' element={<NotFoud />} />
    </Routes>
  );
}

export default MyRouter;
