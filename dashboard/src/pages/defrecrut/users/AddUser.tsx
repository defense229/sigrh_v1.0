import React, { useState } from 'react';
import Button from '../../../components/Buttons/Button';
import Select from '../../../components/Dropdowns/Select';
import Input from '../../../components/Inputs/Input';
import Password from '../../../components/Inputs/Password';
import Modal from '../../../components/Modals/Modal';
import axios from 'axios';
import { config } from '../../../env';
import Toast from '../../../components/Modals/Toast';

const AddUser = ({ afterAdd }: { afterAdd: () => void }) => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({
    role: '',
    username: '',
    password: '',
  });
  const [msg, setMsg] = useState('');
  const [requesting, setRequesting] = useState(false);

  const addUser = async () => {
    setRequesting(true);
    try {
      await axios.post(config.api_url.sigrh + 'auth/register', user);
    } catch (e: any) {
      if (e.response.data.statusCode === 403) {
        setMsg('Cet utilisateur existe déjà');
      }
    }

    setRequesting(false);
    setOpen(false);
    afterAdd();
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Ajouter un utilisateur</Button>
      <Modal title='Ajouter un utilisateur' open={open}>
        <div className='my-8'>
          <Select
            label='Rôle'
            display='label'
            values={[
              { label: 'Super administrateur', name: 'superadmin' },
              { label: 'Administrateur', name: 'admin' },
              { label: 'Utilisateur', name: 'user' },
            ]}
            onChange={(value) => {
              setUser((user) => ({ ...user, role: value.name }));
            }}
          />
        </div>
        <div className='my-8'>
          <Input
            label="Nom d'utilisateur"
            value={user.username}
            onChange={(event) => {
              setUser((user) => ({ ...user, username: event.target.value }));
            }}
          />
        </div>

        <div className='my-8'>
          <Password
            label='Mot de passe'
            value={user.password}
            onChange={(event) => {
              setUser((user) => ({ ...user, password: event.target.value }));
            }}
          />
        </div>

        <div className='mt-16'>
          <Button expand onClick={addUser} loading={requesting}>
            Valider
          </Button>
        </div>
      </Modal>
      <Toast
        open={msg.length > 0}
        color='danger'
        onClose={() => {
          setMsg('');
        }}>
        {msg}
      </Toast>
    </div>
  );
};

export default AddUser;
