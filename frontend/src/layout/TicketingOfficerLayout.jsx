import SidebarButton from '../components/sidebar/SidebarButton';
import DashboardLayout from './DashboardLayout';
import React from 'react';
import { Article, ChromeReaderMode } from '@mui/icons-material';

export default function TicketingOfficerLayout({ children }) {
  return (
    <DashboardLayout
      sidebarButtons={[
        <SidebarButton
          name="Normal Tickets"
          icon={<Article />}
          linkTo="/ticketing/normal"
        />,
        <SidebarButton
          name="Season Tickets"
          icon={<ChromeReaderMode />}
          linkTo="/ticketing/season"
        />,
      ]}
    >
      {children}
    </DashboardLayout>
  );
}
