import { auth } from 'config/firebase';
import PropTypes from 'prop-types';
import React, { createContext, useEffect, useState, useContext } from 'react';

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

const AuthContext = createContext(defaultUser);

function AuthProvider({ children }) {
  const [user, setUser] = useState(defaultUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(async firebaseUser => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        setUser({
          isLoggedIn: true,
          user: { ...firebaseUser },
          token,
        });
      } else {
        setUser(defaultUser);
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
