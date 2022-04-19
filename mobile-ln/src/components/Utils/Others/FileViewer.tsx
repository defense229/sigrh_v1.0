import React, { useEffect, useState } from 'react';
import Button from '../../Buttons/Button';
import SvgArrowBack from '../../Svgs/SvgArrowBack';
import SvgFile from '../../Svgs/SvgFile';
import Flex from '../Flex/Flex';

type Props = {
  title: string;
  onBack: () => void;
  url: string;
  open: boolean;
  ext?: string;
};

function FileViewer({
  title = 'Fichier',
  onBack = () => {},
  url,
  open = true,
  ext = 'pdf',
}: Props) {
  const [_open, setOpen] = useState(open);

  useEffect(() => {
    setOpen(open);
  }, [open]);

  const handleClose = () => {
    onBack();
    setOpen(false);
  };

  const download = () => {
    const a = document.createElement('a');
    a.href = url;
    a.download = title + '.' + ext;
    a.click();
  };

  if (!_open) return null;

  return (
    <div className="file-viewer">
      <div className="bg-white py-6 px-10">
        <Flex justify="between" items="center">
          <Flex items="center" gap="20px">
            <SvgArrowBack className="cursor-pointer" onClick={handleClose} />
            <SvgFile />
            <div>{title}</div>
          </Flex>
          <Button onClick={download}>Télécharger</Button>
        </Flex>
      </div>
      <div className="file">
        <iframe
          src={url + '#toolbar=0'}
          title={title}
          frameBorder="0"
          width="100%"
        />
      </div>
    </div>
  );
}

export default FileViewer;
