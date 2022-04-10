import React from 'react';
import Container from '../components/Utils/Containers/Container';

function NotFoud() {
  return (
    <Container>
      <div className="text-danger fs-32 my-30">
        Ooups, quelque chose s'est mal passé
        <hr className="mt-10" />
      </div>
      <div className="text-center semi-bold fs-20">
        Veuillez vérifier votre connexion internet !
      </div>
    </Container>
  );
}

export default NotFoud;
