import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Dropdown from '../../../components/Dropdowns/Dropdown';
import MainWindow from '../../../components/Layout/Mainwindow/MainWindow';
import Sidebar, {
  ISidebarLink,
} from '../../../components/Layout/Sidebar/Sidebar';
import Topbar from '../../../components/Layout/Topbar/Topbar';
import PageLoading from '../../../components/Progress/PageLoading';
import Condition from '../../../components/Utils/Others/Condition';
import { config } from '../../../env';
import { useAuth } from '../../../services/hooks/useAuth';
import { useFetch } from '../../../services/hooks/useFetch';
import { IUser } from '../../../services/types/login.types';

const links: ISidebarLink[] = [
  { label: 'Vue globale', path: '' },
  { label: 'Phase de dépôt de dossier', path: 'file-collect' },
  { label: 'Phase sportive', path: 'sport' },
  // { label: 'Authentification des diplômes', path: 'dec' },
  { label: 'Phase écrite', path: 'before-writing' },
  // { label: 'Visite médicale', path: 'health-control' },
  { label: 'Paramètres', path: 'settings' },
  { label: 'Utilisateurs', path: 'users' },
  { label: 'Délibérations', path: 'configs' },
];

function ExamWindow() {
  const [authLoading, user] = useAuth();
  const navigate = useNavigate();

  const [loading, exams] = useFetch({
    url: config.api_url.sigrh + 'exams',
  });

  console.log(exams);

  if (authLoading) return <PageLoading />;
  return (
    <div className="bg-light h-page">
      <Topbar user={user as IUser}>
        <div>
          <Condition cond={!loading}>
            <Dropdown
              dropdown={
                <div>
                  {exams &&
                    exams.values.map((exam: any, index: number) => {
                      return (
                        <div
                          className="my-4 cursor-pointer hover-u"
                          key={index}
                          onClick={(v: any) => {
                            navigate('/exam/' + exam.id);
                          }}
                          style={{ width: '200px' }}>
                          {exam.label}
                        </div>
                      );
                    })}
                </div>
              }>
              <div className="radius-8 border-white text-white bold cursor-pointer p-4">
                Charger un examen
              </div>
            </Dropdown>
          </Condition>
        </div>
      </Topbar>
      <Sidebar data={links} />
      <MainWindow>
        <Outlet />
      </MainWindow>
    </div>
  );
}

export default ExamWindow;
