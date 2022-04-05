import React from 'react';
import { RecoilRoot } from 'recoil';
import MyRouter from './routes/MyRouter';

function App() {
  return (
    <RecoilRoot>
      <MyRouter />
    </RecoilRoot>
  );
}

export default App;
