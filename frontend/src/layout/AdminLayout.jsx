import SidebarButton from '../components/sidebar/SidebarButton';
import DashboardLayout from './DashboardLayout';
import React from 'react';
import { Person } from '@mui/icons-material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export default function AdminLayout({ children }) {
  return (
    <DashboardLayout
      sidebarButtons={[
        <SidebarButton
          name="Statistics"
          icon={<TrendingUpIcon />}
          linkTo="/admin/stats"
        />,
        <SidebarButton
          name="Manage Users"
          icon={<Person />}
          linkTo="/admin/manage-users"
        />,
      ]}
    >
      {children}
    </DashboardLayout>
  );
}
