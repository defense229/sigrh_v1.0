import React from 'react';
import { Outlet } from 'react-router-dom';
import MainWindow from '../../../components/Layout/Mainwindow/MainWindow';
import Sidebar, {
  ISidebarLink,
} from '../../../components/Layout/Sidebar/Sidebar';
import Topbar from '../../../components/Layout/Topbar/Topbar';
import PageLoading from '../../../components/Progress/PageLoading';
import { useAuth } from '../../../services/hooks/useAuth';
import { IUser } from '../../../services/types';

const links: ISidebarLink[] = [
  { label: 'Vue globale', path: '' },
  { label: 'Départements', path: 'departement' },
  { label: 'Jury', path: 'jury' },
  { label: 'Membres de jury', path: 'jury-members' },
  { label: 'Candidats', path: 'candidate' },
  { label: 'Questions', path: 'question' },
];

function ExamLnWindow() {
  const [authLoading, user] = useAuth();

  if (authLoading) return <PageLoading />;
  return (
    <div className="bg-light h-page">
      <Topbar user={user as IUser} />
      <Sidebar data={links} />
      <MainWindow>
        <Outlet />
      </MainWindow>
    </div>
  );
}

export default ExamLnWindow;
