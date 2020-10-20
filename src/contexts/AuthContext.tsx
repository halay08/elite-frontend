import { auth } from 'config/firebase';
import PropTypes from 'prop-types';
import React, { createContext, useEffect, useState, useContext } from 'react';
import { STORAGE_TOKEN } from 'config/constants';
import path from 'ramda.path';

type User = {
  user: any;
  isLoggedIn: boolean;
  token: string;
};

const defaultUser: User = {
  user: {},
  isLoggedIn: false,
  token: '',
};

const SIGN_IN_PASSWORD_PROVIDER_ID = 'password';

const AuthContext = createContext(defaultUser);

function AuthProvider({ children }) {
  const [user, setUser] = useState(defaultUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(async firebaseUser => {
      if (firebaseUser) {
        const isEmailPasswordProvider = (function () {
          const providerData = path(['providerData', 0], firebaseUser) || {};
          const providerId = path(['providerId'], providerData) || '';

          return providerId === SIGN_IN_PASSWORD_PROVIDER_ID;
        })();

        const isLoggedIn = isEmailPasswordProvider
          ? firebaseUser.emailVerified
          : true;
        const token = isEmailPasswordProvider
          ? ''
          : await firebaseUser.getIdToken();
        setUser({
          isLoggedIn,
          user: { ...firebaseUser },
          token,
        });
        localStorage.setItem(STORAGE_TOKEN, token);
      } else {
        setUser(defaultUser);
        localStorage.removeItem(STORAGE_TOKEN);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={user}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  return useContext(AuthContext);
};

AuthProvider.propTypes = {
  children: PropTypes.element,
};

export { AuthProvider, useAuth };
