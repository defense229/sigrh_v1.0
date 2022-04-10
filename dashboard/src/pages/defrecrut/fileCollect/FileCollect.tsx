import React from 'react';
import RouterTabs from '../../../components/Tabs/RouterTabs';
import { IRouterTab } from '../../../components/Tabs/tabs.types';

const candidatesTabs: IRouterTab[] = [
  { title: 'Tous les candidats', url: '' },
  { title: 'Acceptés', url: 'accepted' },
  { title: 'Rejetés', url: 'rejected' },
];

function FileCollect() {
  return (
    <div>
      <div className="fs-20 bold">Phase de dépôt de dossier</div>
      <RouterTabs tabs={candidatesTabs} />
    </div>
  );
}

export default FileCollect;
