import SidebarButton from '../components/sidebar/SidebarButton';
import DashboardLayout from './DashboardLayout';
import React from 'react';
import { Article, ChromeReaderMode } from '@mui/icons-material';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';

export default function TicketingOfficerLayout({ children }) {
  return (
    <DashboardLayout
      sidebarButtons={[
        <SidebarButton
          key="{normal}"
          name="Normal Tickets"
          icon={<Article />}
          linkTo="/ticketing/normal"
        />,
        <SidebarButton
          key="{Season}"
          name="Season Tickets"
          icon={<ChromeReaderMode />}
          linkTo="/ticketing/season"
        />,
        <SidebarButton
          key="{reserve}"
          name="Reserve Seats"
          icon={<AirlineSeatReclineExtraIcon />}
          linkTo="/ticketing/reserve"
        />,
      ]}
    >
      {children}
    </DashboardLayout>
  );
}
