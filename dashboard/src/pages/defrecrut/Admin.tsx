import React from 'react';
import { Outlet } from 'react-router-dom';
import MainWindow from '../../components/Navbars/MainWindow';
import Sidebar, { ISidebarLink } from '../../components/Navbars/Sidebar';
import Topbar from '../../components/Navbars/Topbar';
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
  console.log(user);

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
