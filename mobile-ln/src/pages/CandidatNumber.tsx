import axios from 'axios';
import React, { useState } from 'react';
import Button from '../components/Buttons/Button';
import Input from '../components/Inputs/Input';
import { config } from '../env';

type Props = {
  user: any;
};

function CandidatNumber({ user }: Props) {
  const [_number, setNumber] = useState('');

  const handleSelect = async () => {
    console.log(_number);
    const response = await axios.get(
      config.api_url.defrecrutLn +
        'jury/pick-candidate/' +
        user.departement +
        '/' +
        user.jury +
        '/' +
        _number
    );
    console.log(response.data);
  };

  return (
    <div className="my-40 mx-20">
      <div className="fs-20 bold text-center">
        Veuillez saisir le numéro de table d'un candidat
      </div>

      <div className="mt-30">
        <Input value={_number} onChange={(e) => setNumber(e.target.value)} />
      </div>

      <div className="my-10">
        <Button expand onClick={handleSelect}>
          Continuer
        </Button>
      </div>
    </div>
  );
}

export default CandidatNumber;
