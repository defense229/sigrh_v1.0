import React from 'react';
import Flex from '../Utils/Flex/Flex';
import Condition from '../Utils/Others/Condition';
import Checkbox, { ICheckbox } from './Checkbox';
import Radio from './Radio';

export interface ILabledCheckbox extends ICheckbox {
  children: string | null;
  type: 'checkbox' | 'radio';
}

function LabeledCheckbox({
  children = null,
  type = 'checkbox',
  ...props
}: ILabledCheckbox) {
  return (
    <div className="my-8">
      <Flex items="center" gap="10px">
        <Condition cond={type === 'checkbox'}>
          <Checkbox {...props} />
        </Condition>
        <Condition cond={type === 'radio'}>
          <Radio {...props} />
        </Condition>
        <div className="semi-bold">{children}</div>
      </Flex>
    </div>
  );
}

export default LabeledCheckbox;
