import axios from 'axios';
import React, { FormEvent, useState } from 'react';
import Button from '../../../../components/Buttons/Button';
import Select from '../../../../components/Dropdowns/Select';
import Input from '../../../../components/Inputs/Input';
import Password from '../../../../components/Inputs/Password';
import ComponentLoading from '../../../../components/Progress/ComponentLoading';
import Flex from '../../../../components/Utils/Flex/Flex';
import { config } from '../../../../env';
import { useFetch } from '../../../../services/hooks/useFetch';
import { IJuryMember } from './jury-members.types';

function AddJuryMember({
  id = null,
  exam,
  member = null,
  onFinish,
}: {
  id?: string | null;
  exam: string;
  member?: IJuryMember | null;
  onFinish: () => void;
}) {
  const [member_, setMember] = useState(() => {
    if (!member)
      return {
        username: '',
        password: '',
        jury: '',
        exam,
        departement: '',
        role: '',
      };
    return member;
  });
  const [loadingJury, jurys] = useFetch({
    url: config.api_url.defrecrutLn + 'jury/exam/' + exam,
  });
  const [loadingDepartement, departements] = useFetch({
    url: config.api_url.defrecrutLn + 'departements/exam/' + exam,
  });

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setMember({ ...member_, [name]: value });
  };

  const handleSelectChange = (name: string, value: any) => {
    setMember({ ...member_, [name]: value.id });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!id) {
      axios.post(config.api_url.defrecrutLn + 'jury/create-member', member_);
    } else {
      axios.put(
        config.api_url.defrecrutLn + 'jury/update-member/' + id,
        member_
      );
    }
    setMember({
      username: '',
      password: '',
      jury: '',
      exam,
      departement: '',
      role: '',
    });

    onFinish();
  };

  if (loadingDepartement || loadingJury) return <ComponentLoading />;

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction='col' gap='15px'>
        <div className='grid grid-cols-2 gap-20'>
          <Input
            label='Identifiant'
            value={member_.username}
            name='username'
            required
            onChange={handleChange}
          />
          <Password
            label='Mot de passe'
            value={member_.password}
            name='password'
            required
            onChange={handleChange}
          />
        </div>
        <div className='grid grid-cols-2 gap-20'>
          <Select
            label='Jury'
            values={jurys}
            display='numero'
            required
            onChange={(value) => handleSelectChange('jury', value)}
          />
          <Select
            label='Rôle'
            values={[
              { id: 'MEMBER', label: 'Membre de jury' },
              { id: 'PRESIDENT', label: 'Président de jury' },
            ]}
            display='label'
            required
            onChange={(value) => handleSelectChange('role', value)}
          />
        </div>
        <Select
          label='Départements'
          values={departements}
          display='label'
          required
          onChange={(value) => handleSelectChange('departement', value)}
        />
        <Button expand>Valider</Button>
      </Flex>
    </form>
  );
}

export default AddJuryMember;
