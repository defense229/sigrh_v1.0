import React from 'react';
import { useParams } from 'react-router-dom';
import RouterTabs from '../../../components/Tabs/RouterTabs';
import { IRouterTab } from '../../../components/Tabs/tabs.types';
import ExamDetails from '../exams/ExamDetails';

const settingsTabs: IRouterTab[] = [
  { title: 'Candidats', url: '' },
  { title: 'Départements', url: 'departements' },
  { title: 'Matières', url: 'fields' },
  { title: "Centres d'examen", url: 'centers' },
];

function Settings() {
  const { id } = useParams();

  return (
    <div>
      <ExamDetails id={id} />
      <RouterTabs tabs={settingsTabs} />
    </div>
  );
}

export default Settings;
