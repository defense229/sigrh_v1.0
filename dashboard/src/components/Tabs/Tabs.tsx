import React, { useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { CommonElement } from '../../services/libs';
import Flex from '../Utils/Flex/Flex';
import Condition from '../Utils/Others/Condition';
import { ITab, ITabs } from './tabs.types';

const tabCss = 'py-8 px-30 text-center cursor-pointer';

function Tabs({ tabs = [] }: ITabs) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentComponent = useRef<CommonElement | null>(null);
  const navigate = useNavigate();

  return (
    <div className='tabs my-8'>
      <Flex className='header bg-white'>
        {tabs.map((tab: ITab, index: number) => {
          return (
            <div
              key={index}
              className={currentIndex === index ? tabCss + ' active' : tabCss}
              onClick={() => {
                setCurrentIndex(index);
                if (tab.url) {
                  navigate(tab.url);
                }

                if (tab.component) {
                  currentComponent.current = tab.component;
                }
              }}>
              {tab.title}
            </div>
          );
        })}
      </Flex>
      <Condition cond={!!(tabs.length > 0 && tabs[0].url)}>
        <div className='py-8'>
          <Outlet />
        </div>
      </Condition>
    </div>
  );
}

export default Tabs;
