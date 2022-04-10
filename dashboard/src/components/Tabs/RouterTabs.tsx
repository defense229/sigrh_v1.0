import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Flex from '../Utils/Flex/Flex';
import { IRouterTab, IRouterTabs } from './tabs.types';

const tabCss = 'py-8 px-30 text-center cursor-pointer';

function RouterTabs({ tabs = [] }: IRouterTabs) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  return (
    <div className="tabs my-10">
      <Flex className="header bg-white">
        {tabs.map((tab: IRouterTab, index: number) => {
          return (
            <div
              key={index}
              className={currentIndex === index ? tabCss + ' active' : tabCss}
              onClick={() => {
                setCurrentIndex(index);
                navigate(tab.url);
              }}
            >
              {tab.title}
            </div>
          );
        })}
      </Flex>
      <div className="py-8">
        <Outlet />
      </div>
    </div>
  );
}

export default RouterTabs;
