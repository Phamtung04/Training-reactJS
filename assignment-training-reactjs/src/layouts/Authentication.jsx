import { Card } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Authentication = () => {
  return (
    <div className="items-center justify-center flex h-screen">
      <Card className=" mx-auto shadow-lg ">
        <Outlet />
      </Card>
    </div>
  );
};

export default Authentication;
