import axios from 'axios';
import React, { useState } from 'react';
import { config } from '../../../../env';
import { useFetch } from '../../../../services/hooks/useFetch';
import ComponentLoading from '../../../../components/Progress/ComponentLoading';
import Flex from '../../../../components/Utils/Flex/Flex';
import Condition from '../../../../components/Utils/Others/Condition';
import Input from '../../../../components/Inputs/Input';

const NumberOfQuestion2 = () => {
  const [loading, configs, , setConfigs] = useFetch({
    url: config.api_url.defrecrutLn + 'def-config',
  });
  const [question, setQuestion] = useState<string | null>(null);
  const [loader, setLoader] = useState(false);

  console.log(configs);

  const handleSubmit = async () => {
    setLoader(true);
    const response = await axios.post(
      config.api_url.defrecrutLn + 'def-config',
      {
        optionals: Number(question),
      }
    );
    setConfigs(response.data);
    setQuestion(null);
    setLoader(false);
  };

  if (loading) return <ComponentLoading />;
  return (
    <div className="my-10 bg-white py-5 px-10 radius-8">
      <div className="fs-10 semi-bold">
        Nombre de questions optionnelles par candidats
      </div>
      {loader ? (
        <ComponentLoading />
      ) : (
        <Flex justify="between" items="end" gap="30px">
          <Condition cond={!question && question !== ''}>
            <div className="fs-24 bold">
              {configs.optionals ? configs.optionals : ''}
            </div>
          </Condition>
          <Condition cond={question === '' || !!question}>
            <Input
              value={question + ''}
              type="number"
              onChange={(v) => setQuestion(v.target.value)}
            />
          </Condition>
          <div className="pb-5">
            <Condition cond={!question && question !== ''}>
              <u
                className="text-primary cursor-pointer"
                onClick={() => setQuestion(configs.optionals + '')}>
                Modifier
              </u>
            </Condition>

            <Condition cond={question === '' || !!question}>
              <Condition cond={Number(question) > 0}>
                <u
                  className="text-primary cursor-pointer ml-4"
                  onClick={handleSubmit}>
                  Valider
                </u>
              </Condition>
              <u
                className="text-primary cursor-pointer ml-4"
                onClick={() => setQuestion(null)}>
                Annuler
              </u>
            </Condition>
          </div>
        </Flex>
      )}
    </div>
  );
};

export default NumberOfQuestion2;
