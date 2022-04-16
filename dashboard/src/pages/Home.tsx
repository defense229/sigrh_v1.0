import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Search from '../components/Inputs/Search';
import Topbar from '../components/Layout/Topbar/Topbar';
import PageLoading from '../components/Progress/PageLoading';
import Container from '../components/Utils/Containers/Container';
import HomeItem, { IHomeItem } from '../components/Utils/Others/HomeItem';
import { useAuth } from '../services/hooks/useAuth';
import { IUser } from '../services/types/login.types';

const _items: IHomeItem[] = [
  {
    title: 'Defrecrut (DOPA)',
    description:
      'Cliquez sur ce lien pour configurer et gerer tous les concours ayant trait au Ministère de la Défense National',
    url: '/exams',
  },
];

function Home() {
  const [authLoading, user] = useAuth();
  const [items, setItems] = useState<IHomeItem[]>(_items);
  const navigate = useNavigate();

  const handleSearch = (event: any) => {
    const value = event.target.value.toLowerCase();
    const founded = _items.filter((item: IHomeItem) => {
      return (
        item.title.toLowerCase().includes(value) ||
        item.description.toLowerCase().includes(value)
      );
    });
    setItems(value.length === 0 ? [..._items] : founded);
  };

  if (authLoading) return <PageLoading />;

  return (
    <div className="bg-light h-page">
      <Topbar user={user as IUser} />
      <div className="hero">
        <Container width="70%">
          <div className="fs-36 mb-10 text-white bold text-center">
            Bienvenu sur la plateforme de la Défense Nationale ! Veuillez
            rechercher une entité de votre choix
          </div>
          <div className="my-10 w-half m-auto">
            <Search onChange={handleSearch} />
          </div>
        </Container>
      </div>
      <div className="mt-30">
        <Container width="70%">
          <div className="fs-20 pb-4 semi-bold">Entités militaires</div>
          <hr />

          <div className="grid grid-cols-3 my-8 cursor-pointer">
            {items.map((item: IHomeItem, index: number) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    navigate(item.url ?? '/home');
                  }}
                >
                  <HomeItem title={item.title} description={item.description} />
                </div>
              );
            })}
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Home;
