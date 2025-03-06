import React from 'react';
import { ErrorAndSuccessProvider } from './contexts/ErrorAndSuccessContext';
import Router from './router/Router';
import DashboardLayoutSlots from './layouts/DashboardLayoutSlots';
import ListUsers from './pages/user/listUser/ListUsers';
import { CssVarsProvider } from '@mui/joy';
import Register from './pages/authentication/register/Register';
import UpdateUsers from './pages/user/updateUsers/UpdateUsers';
import AppProvider from './contexts/AppProvider';

function App() {
  return (
    <>
      <CssVarsProvider>
        <AppProvider>
          <Router />
        </AppProvider>
      </CssVarsProvider>
      {/* <RegisterTestContainer/> */}

      {/* <UpdateUsers/> */}

      {/* <DashboardLayoutSlots/> */}
      {/* <ListUsers/> */}
    </>
  );
}

export default App;
