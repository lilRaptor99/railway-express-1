import SidebarButton from '../components/sidebar/SidebarButton';
import DashboardLayout from './DashboardLayout';
import React from 'react';
import { Person } from '@mui/icons-material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

export default function AdminLayout({ children }) {
  return (
    <DashboardLayout
      sidebarButtons={[
        <SidebarButton
          key="{Statistics}"
          name="Statistics"
          icon={<TrendingUpIcon />}
          linkTo="/admin/stats"
        />,
        <SidebarButton
          key="{Tickets}"
          name="Tickets"
          icon={<ConfirmationNumberIcon />}
          linkTo="/admin/tickets"
        />,
        <SidebarButton
          key="{Add Account}"
          name="Add User"
          icon={<PersonAddAltIcon />}
          linkTo="/admin/add-account"
        />,
        <SidebarButton
          key="{Manage Users}"
          name="Manage Users"
          icon={<Person />}
          linkTo="/admin/manage/users"
        />,
        <SidebarButton
          key="{Add Crew Members}"
          name="Add Crew Member"
          icon={<PersonAddAltIcon />}
          linkTo="/admin/add-crew-members"
        />,
      ]}
    >
      {children}
    </DashboardLayout>
  );
}
