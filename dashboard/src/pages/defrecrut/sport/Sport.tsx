import React from 'react';
import RouterTabs from '../../../components/Tabs/RouterTabs';
import { IRouterTab } from '../../../components/Tabs/tabs.types';

const candidatesSportTabs: IRouterTab[] = [
  { title: 'Présents', url: '' },
  { title: 'Absents', url: 'absents' },
  { title: 'Acceptés', url: 'accepted' },
  { title: 'Rejetés', url: 'rejected' },
  { title: 'Statistiques', url: 'stats' },
];

function Sport() {
  return (
    <div>
      <div className="fs-20 bold">Phase sportive</div>
      <RouterTabs tabs={candidatesSportTabs} />
    </div>
  );
}

export default Sport;
