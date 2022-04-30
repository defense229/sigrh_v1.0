import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SvgNavlinkItem from '../../Svgs/SvgNavlinkItem';
import Flex from '../../Utils/Flex/Flex';

interface ISidebar {
  data: ISidebarLink[];
}

export interface ISidebarLink {
  label: string;
  path: string;
}

function Sidebar({ data }: ISidebar) {
  const values = useRef<ISidebarLink[]>(data);
  const activeIndex = useRef(0);
  const navigate = useNavigate();
  const location = useLocation();

  const changeRoute = (index: number) => {
    activeIndex.current = index;
    navigate(values.current[index].path);
  };

  useEffect(() => {
    values.current = data;
    const index = data.findIndex(
      (tab: ISidebarLink, i: number) =>
        location.pathname.includes(tab.path) && i !== 0
    );
    console.log(index);
    if (index !== -1) {
      changeRoute(index);
    } else {
      changeRoute(0);
    }
    // eslint-disable-next-line
  }, [data]);

  return (
    <div className='sidebar'>
      <Flex direction='col' gap='20px'>
        {data.map((item: ISidebarLink, index: number) => {
          return (
            <div
              className={
                activeIndex.current === index
                  ? 'p-6 active w-full cursor-pointer'
                  : 'p-6 w-full cursor-pointer'
              }
              onClick={() => changeRoute(index)}
              key={index}>
              <Flex className='ellipsis' items='center' gap='7px' key={index}>
                <SvgNavlinkItem
                  state={activeIndex.current === index ? 'active' : 'inactive'}
                />
                <div>{item.label}</div>
              </Flex>
            </div>
          );
        })}
      </Flex>
    </div>
  );
}

export default Sidebar;
