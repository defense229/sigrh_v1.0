import React, { ReactElement } from 'react';

function MainWindow({ children }: { children: ReactElement }) {
  return <div className="mainwindow">{children}</div>;
}

export default MainWindow;
