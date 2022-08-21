import SidebarButton from '../components/sidebar/SidebarButton';
import DashboardLayout from './DashboardLayout';
import React from 'react';
import { LocationOn, Train } from '@mui/icons-material';
import PeopleIcon from '@mui/icons-material/People';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';

export default function ControlOfficerLayout({ children }) {
  return (
    <DashboardLayout
      sidebarButtons={[
        <SidebarButton
          key="{Train Location}"
          name="Train Location"
          icon={<LocationOn />}
          linkTo="/control/train-location"
        />,
        <SidebarButton
          key="{Add Train Turn}"
          name="Add Train Turn"
          icon={<Train />}
          linkTo="/control/add-turn"
        />,
        <SidebarButton
          key="{Allocate Crew Members}"
          name="Allocate Crew Members"
          icon={<PeopleIcon />}
          linkTo="/control/allocate-crew"
        />,
        <SidebarButton
          key="{Search Turns}"
          name="Search Turns"
          icon={<SearchIcon />}
          linkTo="/control/search-turn"
        />,
        <SidebarButton
          key="{Complaints and Suggestions}"
          name="Complaints/Suggestions"
          icon={<ChatIcon />}
          linkTo="/control/complaints-suggestions"
        />,
      ]}
    >
      {children}
    </DashboardLayout>
  );
}
