import axios from 'axios';
import React, { useState } from 'react';
import Button from '../components/Buttons/Button';
import Input from '../components/Inputs/Input';
import { config } from '../env';

type Props = {
  user: any;
  numero: string;
};

function SelectNumbers({ user, numero }: Props) {
  const [_numbers, setNumbers] = useState('');

  const handleSelect = async () => {
    console.log(_numbers);
    const response = await axios.post(
      config.api_url.defrecrutLn +
        'jury/pick-candidate/' +
        user.departement +
        '/' +
        user.jury +
        '/' +
        numero,
      _numbers
        .trim()
        .split(',')
        .map((num: string) => Number(num.trim()))
    );
    console.log(response.data);
  };

  return (
    <div className="my-40 mx-20">
      <div className="fs-20 bold text-center">
        Veuillez saisir les numéros choisis par le candidat.
      </div>
      <div className="fs-18 mt-4 bold text-center">
        Veuillez séparer les numéros par une virgule.
      </div>

      <div className="mt-30">
        <Input value={_numbers} onChange={(e) => setNumbers(e.target.value)} />
      </div>

      <div className="my-10">
        <Button expand onClick={handleSelect}>
          Continuer
        </Button>
      </div>
    </div>
  );
}

export default SelectNumbers;
