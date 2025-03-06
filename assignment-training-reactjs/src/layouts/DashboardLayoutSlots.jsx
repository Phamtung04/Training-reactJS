import * as React from 'react';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import SidebarFooter from '../components/sidebar/SidebarFooter';
import ToolbarActionsSearch from '../components/sidebar/ToolbarActionsSearch';
import CustomAppTitle from '../components/sidebar/CustomAppTitle';
import PageContent from './../components/sidebar/PageContent';
import { Outlet, useLocation } from 'react-router-dom';
import demoTheme from '../constants/theme';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Menu',
  },
  {
    segment: 'users',
    title: 'List User',
    icon: <DashboardIcon />,
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
  },
];



function DashboardLayoutSlots() {
  const location = useLocation();

  return (
      <AppProvider navigation={NAVIGATION} theme={demoTheme}>
        <DashboardLayout
          slots={{
            appTitle: CustomAppTitle,
            // toolbarActions: ToolbarActionsSearch,
            sidebarFooter: SidebarFooter,
          }}
        >
          <PageContent pathname={location.pathname}>
            <Outlet />
          </PageContent>
        </DashboardLayout>
      </AppProvider>
  );
}

export default DashboardLayoutSlots;
