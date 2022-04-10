import React from 'react';
import { Outlet } from 'react-router-dom';
import MainWindow from '../../components/Layout/Mainwindow/MainWindow';
import Sidebar, { ISidebarLink } from '../../components/Layout/Sidebar/Sidebar';
import Topbar from '../../components/Layout/Topbar/Topbar';
import PageLoading from '../../components/Progress/PageLoading';
import { useAuth } from '../../services/hooks/useAuth';
import { IUser } from '../../services/types/login.types';

const links: ISidebarLink[] = [
  { label: 'Examens', path: '/defrecrut' },
  { label: 'Utilisateurs', path: '/defrecrut' },
];

function Admin() {
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

export default Admin;
