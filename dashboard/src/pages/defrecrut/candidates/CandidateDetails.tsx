import axios from 'axios';
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../../components/Buttons/Button';
import Dropdown from '../../../components/Dropdowns/Dropdown';
import Select from '../../../components/Dropdowns/Select';
import ComponentLoading from '../../../components/Progress/ComponentLoading';
import SvgEdit from '../../../components/Svgs/SvgEdit';
import Flex from '../../../components/Utils/Flex/Flex';
import BackLink from '../../../components/Utils/Others/BackLink';
import Condition from '../../../components/Utils/Others/Condition';
import StatusDisplay from '../../../components/Utils/Others/StatusDisplay';
import TitleLinkDisplay from '../../../components/Utils/Others/TitleLinkDisplay';
import TitleValueDisplay from '../../../components/Utils/Others/TitleValueDisplay';
import { config } from '../../../env';
import { useFetch } from '../../../services/hooks/useFetch';
import { CandidateStatus } from '../../../services/types/candidates.types';

function CandidateDetails() {
  const { candidateId } = useParams();
  const [loading, candidate, _, __, reload] = useFetch({
    url: config.api_url.sigrh + 'candidats/' + candidateId,
  });
  const [isSetting, setIsSetting] = useState(false);
  const [examsLoading, exams] = useFetch({
    url: config.api_url.sigrh + 'exams',
  });
  const navigate = useNavigate();

  if (loading || isSetting || examsLoading) return <ComponentLoading />;

  console.log(candidate, exams);

  const accept = async () => {
    setIsSetting(true);
    await axios.get(config.api_url.sigrh + 'candidats/accept/' + candidateId);
    reload();
    setIsSetting(false);
  };

  const reject = async () => {
    setIsSetting(true);
    await axios.get(config.api_url.sigrh + 'candidats/reject/' + candidateId);
    reload();
    setIsSetting(false);
  };

  const presentSport = async () => {
    setIsSetting(true);
    await axios.get(
      config.api_url.sigrh + 'candidats/present-sport/' + candidateId
    );
    reload();
    setIsSetting(false);
  };

  const acceptSport = async () => {
    setIsSetting(true);
    await axios.get(
      config.api_url.sigrh + 'candidats/accept-sport/' + candidateId
    );
    reload();
    setIsSetting(false);
  };

  const getExamValue = (id: string) => {
    if (exams) {
      return exams.values.find((exam: any) => exam.id === id);
    }
  };

  const changeExam = async (id: string) => {
    setIsSetting(true);
    await axios.get(
      config.api_url.sigrh + 'candidats/change-exam/' + candidateId + '/' + id
    );
    reload();
    setIsSetting(false);
    navigate('/exam/' + id + '/candidate/' + candidateId);
  };

  return (
    <div>
      <Flex justify='between' items='center'>
        <BackLink />
      </Flex>
      <div className='my-10'>
        <Flex items='center' justify='between'>
          <div>
            <div className='fs-20 bold'>
              Candidature n° {candidate.numeroDepotDossier}
            </div>
            <Flex items='center' className='my-2' gap='100px'>
              <Flex items='center' gap='10px'>
                <div className='semi-bold'>Status du dossier: </div>
                <StatusDisplay
                  value={
                    candidate.accepted
                      ? CandidateStatus.ACCEPTED
                      : candidate.rejected
                      ? CandidateStatus.REJECTED
                      : CandidateStatus.NEW
                  }
                />
              </Flex>
              <div>
                Reçu le
                <b>
                  {' ' +
                    new Date(
                      Number(candidate.dateEnregistrement)
                    ).toLocaleString()}
                </b>
              </div>
            </Flex>
          </div>

          <Flex>
            <Condition cond={candidate.accepted}>
              <Button color='danger' onClick={reject}>
                Rejeter la candidature
              </Button>
            </Condition>
            <Condition cond={candidate.rejected}>
              <Button onClick={accept}>Accepter la candidature</Button>
            </Condition>
            <Condition cond={!candidate.accepted && !candidate.rejected}>
              <Button onClick={reject}>Rejeter</Button>
              <Button onClick={accept}>Accepter</Button>
            </Condition>
            <div>
              <Dropdown
                dropdown={
                  <div style={{ width: '200px' }}>
                    <div
                      className='mb-4 hover-u cursor-pointer'
                      onClick={presentSport}>
                      Marquer présent au sport
                    </div>
                    <div
                      className='hover-u cursor-pointer'
                      onClick={acceptSport}>
                      Accepter au sport
                    </div>
                  </div>
                }>
                <Button outlined color='dark-gray' className='ml-8'>
                  Plus
                </Button>
              </Dropdown>
            </div>
          </Flex>
        </Flex>
      </div>

      <div className='bg-white p-10'>
        <div className='mb-5'>
          <Flex justify='between' items='center'>
            <div className='fs-18 bold'>Informations personnelles</div>
            <Button
              className='py-4 px-8'
              outlined
              icon={<SvgEdit color='#085A03' />}>
              Modifier les informations
            </Button>
          </Flex>
        </div>

        <div className='grid grid-cols-3'>
          <TitleValueDisplay title='Nom' value={candidate.nom} />
          <TitleValueDisplay title='Prénom(s)' value={candidate.prenom} />
          <TitleValueDisplay
            title='Numéro de table'
            value={candidate.numero ? candidate.numero : '-'}
          />
          <TitleValueDisplay
            title='Genre'
            value={candidate.sexe === 'H' ? 'Homme' : 'Femme'}
          />
          <TitleValueDisplay
            title='Date de naissance'
            value={new Date(
              Number(candidate.dateNaissance)
            ).toLocaleDateString()}
          />
          <TitleValueDisplay
            title='Lieu de naissance'
            value={candidate.lieuNaissance}
          />
          <TitleValueDisplay
            title='Département'
            value={candidate.departement}
          />
          <TitleValueDisplay
            title='Diplôme'
            value={candidate.diplomePresente}
          />
          <TitleValueDisplay
            title="Lieu d'optention du diplôme"
            value={candidate.lieuObtention}
          />
          <TitleValueDisplay title='Téléphone' value={candidate.telephone} />
          <TitleValueDisplay title='Email' value={candidate.email} />
          <TitleValueDisplay
            title='Numéro de la CNI'
            value={candidate.numeroPiece}
          />
        </div>

        <hr />

        <div className='fs-18 bold mt-10 mb-5'>Pièces jointes</div>
        <div className='grid grid-cols-3'>
          <TitleLinkDisplay
            title='Acte de naissance'
            url={candidate.acteNaissance}
          />
          <TitleLinkDisplay
            title='Certificat de nationalité'
            url={candidate.certificatNationalite}
          />
          <TitleLinkDisplay
            title="Carte d'identité"
            url={candidate.carteIdentite}
          />
          <TitleLinkDisplay title='Diplôme' url={candidate.diplome} />
          <TitleLinkDisplay
            title='Attestation de résidence'
            url={candidate.attestationResidence}
          />
          <TitleLinkDisplay
            title='Casier judiciaire'
            url={candidate.casierJudiciaire}
          />
          <TitleLinkDisplay
            title='Certificat de position militaire'
            url={candidate.certificatPositionMilitaire}
          />
          <TitleLinkDisplay
            title="Certificat médical d'aptitude physique"
            url={candidate.certificatMedicalAptitudePhysique}
          />
        </div>

        <hr />
        <div className='fs-18 bold mt-10 mb-5'>Type de candidature</div>
        <div>
          <TitleValueDisplay
            title='Type de candidature'
            value={getExamValue(candidate.exam).label}
          />

          <div className='mt-10'>
            <Select
              placeholder='Changer le type de candidature'
              display='label'
              onChange={(v: any) => {
                changeExam(v.id);
              }}
              values={exams.values}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateDetails;
