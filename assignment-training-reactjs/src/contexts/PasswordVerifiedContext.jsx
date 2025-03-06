import { createContext, useState } from 'react';

const PasswordVerifiedContext = createContext();

const PasswordVerifiedProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  return (
    <PasswordVerifiedContext.Provider value={{ email, setEmail }}>
      {children}
    </PasswordVerifiedContext.Provider>
  );
};

export { PasswordVerifiedProvider, PasswordVerifiedContext };
