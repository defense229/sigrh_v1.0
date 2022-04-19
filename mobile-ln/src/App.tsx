import React from 'react';
import { RecoilRoot } from 'recoil';
import MyRouter from './routes/MyRouter';
import SocketProvider from './services/providers/websocket/SocketProvider';

function App() {
  return (
    <SocketProvider>
      <RecoilRoot>
        <MyRouter />
      </RecoilRoot>
    </SocketProvider>
  );
}

export default App;
