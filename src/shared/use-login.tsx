import {createContext, PropsWithChildren, useContext, useState} from 'react';

const LoggedInContext = createContext<{
  loggedIn: boolean;
  setLoggedIn: (val: boolean) => void;
  passkey: string | null;
  setPasskey: (val: string) => void;
}>({
  loggedIn: false,
  setLoggedIn: (_val) => {},
  passkey: null,
  setPasskey: (_val) => {},
});

export const LoginProvider = ({children}: PropsWithChildren) => {
  const [loggedIn, _setloggedIn] = useState(false);
  const [passkey, _setPasskey] = useState<string | null>(null);
  const setLoggedIn = (value: boolean) => {
    _setloggedIn(value);
  };
  const setPasskey = (value: string) => {
    _setPasskey(value);
  };

  return (
    <LoggedInContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        passkey,
        setPasskey,
      }}>
      {children}
    </LoggedInContext.Provider>
  );
};

export const useLogin = () => {
  const {loggedIn, setLoggedIn, passkey, setPasskey} =
    useContext(LoggedInContext);
  return {loggedIn, setLoggedIn, passkey, setPasskey};
};
