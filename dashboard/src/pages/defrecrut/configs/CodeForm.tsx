import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../../components/Buttons/Button';
import Password from '../../../components/Inputs/Password';
import { config } from '../../../env';

function CodeForm({ reload = () => {} }: { reload: any }) {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    codeMinistre: '',
    codeDopa: '',
  });
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(form);
    setLoading(true);
    const response = await axios.patch(
      config.api_url.sigrh + 'settings/' + id,
      form
    );
    setLoading(false);
    console.log(response.data);
    reload();
  };

  return (
    <form className="p-10" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-30">
        <Password
          value={form.codeMinistre}
          onChange={(e) => {
            setForm({ ...form, codeMinistre: e.target.value });
          }}
          label="Définir le code du ministre"
        />
        <Password
          value={form.codeDopa}
          onChange={(e) => {
            setForm({ ...form, codeDopa: e.target.value });
          }}
          label="Définir le code du DOPA"
        />
      </div>

      <div className=" mt-8 text-right">
        <Button loading={loading} outlined>
          Enregistrer
        </Button>
      </div>
    </form>
  );
}

export default CodeForm;
