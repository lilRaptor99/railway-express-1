import SidebarButton from '../components/sidebar/SidebarButton';
import DashboardLayout from './DashboardLayout';
import React from 'react';
import { LocationOn, Train } from '@mui/icons-material';

export default function ControlOfficerLayout({ children }) {
  return (
    <DashboardLayout
      sidebarButtons={[
        <SidebarButton
          name="Train Location"
          icon={<LocationOn />}
          linkTo="/control/train-location"
        />,
        <SidebarButton
          name="Add Train Turn"
          icon={<Train />}
          linkTo="/control/add-turn"
        />,
      ]}
    >
      {children}
    </DashboardLayout>
  );
}
