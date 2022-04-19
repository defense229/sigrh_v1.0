import React, { useState } from 'react';
import Topbar from '../components/Layout/Topbar/Topbar';
import ComponentLoading from '../components/Progress/ComponentLoading';
import { useAuth } from '../services/hooks/useAuth';
import { IUser } from '../services/types';
import CandidatNumber from './CandidatNumber';

function Home() {
  const [current, setCurrent] = useState(null);
  const [authLoading, user] = useAuth();

  console.log(user);

  if (authLoading) return <ComponentLoading />;

  if (current) return <div>Here is current</div>;

  return (
    <div>
      <Topbar user={user as IUser} />
      <CandidatNumber setCurrent={setCurrent} user={user} />
    </div>
  );
}

export default Home;
