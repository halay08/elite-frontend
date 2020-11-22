import { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useLocalStorageState } from 'ahooks';
import * as firebase from 'firebase/app';
import 'firebase/auth';

export default function useFirebaseAuth() {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const [currentLocation] = useLocalStorageState(
    'current-location',
    location.pathname,
  );

  const getToken = useCallback(
    async (identity: string, roomName: string) => {
      const headers = new window.Headers();

      const idToken = await user!.getIdToken();
      headers.set('Authorization', idToken);

      const endpoint = process.env.REACT_APP_TWILIO_TOKEN_ENDPOINT || '/token';
      const params = new window.URLSearchParams({ identity, roomName });

      return fetch(`${endpoint}?${params}`, { headers }).then(res => {
        return res.json();
      });
    },
    [user],
  );

  useEffect(() => {
    // firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged(user => {
      setUser(user);
      setIsAuthReady(true);
      if (user) {
        history.push(currentLocation);
      }
    });
  }, [history, currentLocation, location.pathname]);

  const signIn = useCallback(() => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');

    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(user => {
        setUser(user.user);
      });
  }, []);

  const signOut = useCallback(() => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
      });
  }, []);

  return { user, signIn, signOut, isAuthReady, getToken };
}
