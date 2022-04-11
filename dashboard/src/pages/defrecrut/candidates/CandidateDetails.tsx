import React from 'react';
import { useParams } from 'react-router-dom';
import ComponentLoading from '../../../components/Progress/ComponentLoading';
import { config } from '../../../env';
import { useFetch } from '../../../services/hooks/useFetch';

function CandidateDetails() {
  const { candidateId } = useParams();
  const [loading, candidate] = useFetch({
    url: config.api_url.sigrh + 'candidats/' + candidateId,
  });

  if (loading) return <ComponentLoading />;

  console.log(candidate);

  return <div>CandidateDetails</div>;
}

export default CandidateDetails;
