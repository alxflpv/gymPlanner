import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Customer List',
    path: '/customerlist',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Training List',
    path: '/traininglist',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  
  {
  title: 'Calender',
  path: '/calender',
  icon: <IoIcons.IoIosPaper />,
  cName: 'nav-text'
}

];