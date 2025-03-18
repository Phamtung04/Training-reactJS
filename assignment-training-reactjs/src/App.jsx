import React from 'react';
import Router from './router/Router';
import AppProvider from './contexts/AppProvider';

function App() {
  return (
    <>
      {/* <CssVarsProvider> */}
        <AppProvider>
          <Router />
        </AppProvider>
      {/* </CssVarsProvider> */}

      {/* <Layout/> */}
    </>
  );
}

export default App;
