import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SvgNavlinkItem from '../Svgs/SvgNavlinkItem';
import Flex from '../Utils/Flex/Flex';

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

  const changeRoute = (index: number) => {
    activeIndex.current = index;
    navigate(values.current[index].path);
  };

  useEffect(() => {
    values.current = data;
  }, [data]);
  return (
    <div className="sidebar">
      <Flex direction="col" gap="10px">
        {data.map((item: ISidebarLink, index: number) => {
          return (
            <div
              className={
                activeIndex.current === index
                  ? 'p-6 active w-full cursor-pointer'
                  : 'p-6 w-full cursor-pointer'
              }
              onClick={() => changeRoute(index)}
              key={index}
            >
              <Flex items="center" gap="7px" key={index}>
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
