import React from 'react';
import Button from '../components/Buttons/Button';
import SvgArrowBack from '../components/Svgs/SvgArrowBack';
import Flex from '../components/Utils/Flex/Flex';
import Condition from '../components/Utils/Others/Condition';
import TitleValueDisplay from '../components/Utils/Others/TitleValueDisplay';

type Props = {
  candidate: any;
  onNext: () => void;
  onPrev: () => void;
};

const CandidatInfo = ({ candidate, onNext, onPrev }: Props) => {
  return (
    <div className="bg-white p-10 radius-8">
      <Flex gap="10px" className="mb-8">
        <SvgArrowBack className="cursor-pointer" onClick={onPrev} />
        <div className="fs-18 bold">Informations du candidat</div>
      </Flex>
      <hr />

      <Flex className="mt-10" direction="col" gap="5px">
        <TitleValueDisplay title="Numéro de table" value={candidate.numero} />
        <TitleValueDisplay
          title="Nom et prénom(s)"
          value={
            candidate.nom.toUpperCase() + ' ' + candidate.prenom.toUpperCase()
          }
        />
        <TitleValueDisplay
          title="Date de naissance"
          value={candidate.dateNaissance}
        />
        <Condition cond={!!candidate.language}>
          <TitleValueDisplay
            title="Langue principale"
            value={candidate.language ? candidate.language : ''}
          />
        </Condition>
        <Condition cond={!!candidate.optionalLanguage}>
          <TitleValueDisplay
            title="Langue optionnelle"
            value={candidate.optionalLanguage ? candidate.optionalLanguage : ''}
          />
        </Condition>
        <TitleValueDisplay
          title="Genre"
          value={candidate.sexe === 'H' ? 'Homme' : 'Femme'}
        />
        <div className="mt-10 w-full">
          <Button expand onClick={onNext}>
            Continuer
          </Button>
        </div>
      </Flex>
    </div>
  );
};

export default CandidatInfo;
