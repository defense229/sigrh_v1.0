import React, { useState } from 'react';
import FileViewer from './FileViewer';

type Props = {
  title: string;
  url: string;
};

function TitleLinkDisplay({ title, url }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div className="my-5">
      <div className="fs-14 semi-bold">{title}</div>
      <div className="fs-14 cursor-pointer" onClick={() => setOpen(true)}>
        <u style={{ color: '#0965F6' }}>Voir le fichier</u>
      </div>

      <FileViewer
        title={title}
        onBack={() => setOpen(false)}
        open={open}
        url={url}
      />
    </div>
  );
}

export default TitleLinkDisplay;
