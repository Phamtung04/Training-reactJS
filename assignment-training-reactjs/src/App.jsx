import React from 'react';
import Router from './router/Router';
import AppProvider from './contexts/AppProvider';

function App() {
  return (
    <>
        <AppProvider>
          <Router />
        </AppProvider>
    </>
  );
}

export default App;
