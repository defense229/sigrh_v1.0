import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../components/Buttons/Button';
import Password from '../../../components/Inputs/Password';
import Modal from '../../../components/Modals/Modal';
import { config } from '../../../env';

function ValidationButton() {
  const [open, setOpen] = useState(false);

  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const [form, setForm] = useState({
    codeMinistre: '',
    codeDopa: '',
  });
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(form);
    setLoading(true);
    try {
      await axios.post(
        config.api_url.sigrh + 'settings/confirm-codes/' + id,
        form
      );

      setLoading(false);
      setOpen(false);
      navigate('/exam/' + id + '/before-writing');
    } catch (error) {
      setErr('Identifiants incorrects');
      setLoading(false);

      setTimeout(() => {
        setErr('');
      }, 5000);
    }
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Valider la simulation</Button>
      <Modal
        title="Confirmer la validation"
        open={open}
        onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit}>
          {err.length > 0 ? (
            <div className="my-4 bg-danger text-center text-white py-4 bold mb-8 radius-8">
              {err}
            </div>
          ) : (
            <></>
          )}
          <div className="grid grid-cols-2 gap-30">
            <Password
              value={form.codeMinistre}
              onChange={(e) => {
                setForm({ ...form, codeMinistre: e.target.value });
              }}
              label="Saisir le code du ministre"
            />
            <Password
              value={form.codeDopa}
              onChange={(e) => {
                setForm({ ...form, codeDopa: e.target.value });
              }}
              label="Saisir le code du DOPA"
            />
          </div>

          <div className=" mt-8 text-right">
            <Button loading={loading}>Continuer</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default ValidationButton;
