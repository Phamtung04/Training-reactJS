import React, { use } from 'react';
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, Outlet, useLocation } from 'react-router-dom';
import SidebarFooter from './SidebarFooter';
import { useTranslation } from 'react-i18next';

const drawerWidth = 250;

const Contents = () => {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();

  const {t} = useTranslation();

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  const navItems = [
    { text: t('menuContainer.listUser'), path: '/users', icon: <DashboardIcon /> },
    { text: t('menuContainer.order'), path: '/orders', icon: <ShoppingCartIcon /> },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <IconButton
        onClick={toggleDrawer}
        sx={{
          position: 'fixed',
          top: 10,
          left: 10,
          backgroundColor: 'primary.main',
          color: 'white',
          '&:hover': { backgroundColor: 'primary.dark' },
        }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          '& .MuiDrawer-paper': {
            height: '90vh',
            width: open ? drawerWidth : 60,
            transition: 'width 0.3s',
            overflowX: 'hidden',
            position: 'relative',
            backgroundColor: '#f1f1f1',
          },
        }}
      >
        <div>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  sx={{
                    backgroundColor: location.pathname === item.path ? 'primary.light' : 'inherit',
                    color: location.pathname === item.path ? 'white' : 'inherit',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      color: 'white',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{ color: location.pathname === item.path ? 'white' : 'inherit' }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {open && <ListItemText primary={item.text} />}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
            }}
          >
            <SidebarFooter />
          </Box>
        </div>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          transition: 'margin-left 0.3s',
        }}
      >
        <div className="w-3/4 justify-self-center">
          <Outlet />
        </div>
      </Box>
    </Box>
  );
};

export default Contents;
