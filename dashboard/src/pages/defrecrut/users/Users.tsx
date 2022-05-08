import axios from 'axios';
import React, { useState } from 'react';
import ComponentLoading from '../../../components/Progress/ComponentLoading';
import SvgTrash from '../../../components/Svgs/SvgTrash';
import Table from '../../../components/Tables/Table';
import Flex from '../../../components/Utils/Flex/Flex';
import Condition from '../../../components/Utils/Others/Condition';
import { config } from '../../../env';
import { useFetch } from '../../../services/hooks/useFetch';
import AddUser from './AddUser';

function Users() {
  const [url, setUrl] = useState(config.api_url.sigrh + 'auth/users');
  const [loading, users] = useFetch({
    url,
  });

  return (
    <div>
      <Flex justify='between' items='center'>
        <div className='fs-20 bold'>Utilisateurs</div>
        <AddUser
          afterAdd={() => {
            setUrl('');
            setUrl(config.api_url.sigrh + 'auth/users');
          }}
        />
      </Flex>
      <Condition cond={loading}>
        <ComponentLoading />
      </Condition>

      <Condition cond={!loading}>
        <div className='my-20 datatable'>
          <Table
            selection
            rows={users}
            cols={[
              { label: "Nom d'utilisateur", name: 'username' },
              { label: 'Rôle', name: 'role' },
              { label: 'Département', name: 'departement' },
              {
                label: '',
                render: (row: any) => {
                  return (
                    <div
                      onClick={async () => {
                        if (
                          window.confirm(
                            'Etes-vous sur de vouloir supprimer cet utilisateur ?'
                          )
                        ) {
                          await axios.delete(
                            config.api_url.sigrh + 'auth/user/' + row.id
                          );
                          setUrl('');
                          setUrl(config.api_url.sigrh + 'auth/users');
                        }
                      }}>
                      <SvgTrash color='red' />
                    </div>
                  );
                },
              },
            ]}
          />
        </div>
      </Condition>
    </div>
  );
}

export default Users;
