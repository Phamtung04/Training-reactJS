import React, { createContext, useContext } from 'react';
import swal from 'sweetalert';

export const ErrorAndSuccessContext = createContext();

export const useErrorAndSuccess = () => useContext(ErrorAndSuccessContext);

export const ErrorAndSuccessProvider = ({ children }) => {
  const showError = (message) => {
    swal({
      title: 'Error!',
      text: message,
      icon: 'error',
      button: 'OK',
    });
  };

  const showSuccess = (message) => {
    swal({
      title: 'Success!',
      text: message,
      icon: 'success',
      button: 'OK',
    });
  };
  return (
    <ErrorAndSuccessContext.Provider value={{ showError, showSuccess }}>
      {children}
    </ErrorAndSuccessContext.Provider>
  );
};
