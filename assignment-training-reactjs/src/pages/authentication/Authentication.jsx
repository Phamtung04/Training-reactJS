import { Card } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import demoTheme from '../../constants/theme';

const Authentication = () => {
  return (
    <div className="items-center justify-center flex h-screen">
      {/* <ThemeProvider theme={demoTheme}> */}
      <Card className=" mx-auto shadow-lg ">
        <Outlet />
      </Card>
      {/* </ThemeProvider> */}
      
    </div>
  );
};

export default Authentication;
