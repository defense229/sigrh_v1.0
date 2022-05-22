import React, {
  createContext,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { io } from 'socket.io-client';
import { config } from '../../../env';

export type SocketListenerCallback = (event: string, cb: any) => void;

const SocketContext = createContext<SocketListenerCallback>(() => {});

export const useSocketListener = () => useContext(SocketContext);

function SocketProvider({ children }: { children: ReactElement }) {
  const socket = useRef<any>(null);

  useEffect(() => {
    const _socket = io(config.api_url.ws, { transports: ['websocket'] });
    socket.current = _socket;

    _socket.on('connect', () => {
      console.log('Socket ' + _socket.id + ' connected!');
    });

    _socket.on('results', (data) => {
      console.log('[results:event]:', data);
    });
  }, []);

  const addSocketListener = useCallback(
    (event: string, cb: any) => {
      socket.current.on(event, (data: string) => {
        cb(data);
      });
    },
    [socket]
  );

  return (
    <SocketContext.Provider value={addSocketListener}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
