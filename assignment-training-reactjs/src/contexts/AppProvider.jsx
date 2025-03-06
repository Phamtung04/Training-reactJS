import React from 'react';
import { PasswordVerifiedProvider } from './PasswordVerifiedContext';
import { ErrorAndSuccessProvider } from './ErrorAndSuccessContext';

const AppProvider = ({children}) => {
  return (
    <PasswordVerifiedProvider>
        <ErrorAndSuccessProvider>
            {children}
        </ErrorAndSuccessProvider>
    </PasswordVerifiedProvider>
  );
};

export default AppProvider;
