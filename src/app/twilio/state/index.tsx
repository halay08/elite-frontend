import React, { createContext, useContext, useReducer, useState } from 'react';
import { RoomType, IDataTrackCommunication } from '../types';
import { TwilioError } from 'twilio-video';
import {
  settingsReducer,
  initialSettings,
  Settings,
  SettingsAction,
} from './settings/settingsReducer';
import useActiveSinkId from './useActiveSinkId/useActiveSinkId';
import useFirebaseAuth from './useFirebaseAuth/useFirebaseAuth';
import usePasscodeAuth from './usePasscodeAuth/usePasscodeAuth';
import useChat from './useChat';
import useCaption from './useCaption';
import { User } from 'firebase';

export interface StateContextType {
  error: TwilioError | null;
  setError(error: TwilioError | null): void;
  getToken(name: string, room: string, passcode?: string): Promise<string>;
  user?:
    | User
    | null
    | { displayName: undefined; photoURL: undefined; passcode?: string };
  signIn?(passcode?: string): Promise<void>;
  signOut?(): Promise<void>;
  isAuthReady?: boolean;
  isFetching: boolean;
  activeSinkId: string;
  setActiveSinkId(sinkId: string): void;
  messages: Array<Partial<IDataTrackCommunication>>;
  setMessage(message: Partial<IDataTrackCommunication>): void;
  notificationCount: number;
  setNotificationCount(count: number): void;
  caption: Array<Partial<IDataTrackCommunication>>;
  setCaption(message: Partial<IDataTrackCommunication>): void;
  toggleCaption: boolean;
  setToggleCaption(state: boolean): void;
  settings: Settings;
  dispatchSetting: React.Dispatch<SettingsAction>;
  roomType?: RoomType;
}

export const StateContext = createContext<StateContextType>(null!);

/*
  The 'react-hooks/rules-of-hooks' linting rules prevent React Hooks fron being called
  inside of if() statements. This is because hooks must always be called in the same order
  every time a component is rendered. The 'react-hooks/rules-of-hooks' rule is disabled below
  because the "if (process.env.REACT_APP_SET_AUTH === 'firebase')" statements are evaluated
  at build time (not runtime). If the statement evaluates to false, then the code is not
  included in the bundle that is produced (due to tree-shaking). Thus, in this instance, it
  is ok to call hooks inside if() statements.
*/
export default function AppStateProvider(props: React.PropsWithChildren<{}>) {
  const [error, setError] = useState<TwilioError | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [activeSinkId, setActiveSinkId] = useActiveSinkId();
  const [
    messages,
    setMessage,
    notificationCount,
    setNotificationCount,
  ] = useChat();
  const [caption, setCaption, toggleCaption, setToggleCaption] = useCaption();
  const [settings, dispatchSetting] = useReducer(
    settingsReducer,
    initialSettings,
  );

  let contextValue = {
    error,
    setError,
    isFetching,
    activeSinkId,
    setActiveSinkId,
    messages,
    setMessage,
    caption,
    setCaption,
    toggleCaption,
    setToggleCaption,
    notificationCount,
    setNotificationCount,
    settings,
    dispatchSetting,
  } as StateContextType;

  if (process.env.REACT_APP_SET_AUTH === 'firebase') {
    contextValue = {
      ...contextValue,
      ...useFirebaseAuth(), // eslint-disable-line react-hooks/rules-of-hooks
    };
  } else if (process.env.REACT_APP_SET_AUTH === 'passcode') {
    contextValue = {
      ...contextValue,
      ...usePasscodeAuth(), // eslint-disable-line react-hooks/rules-of-hooks
    };
  } else {
    contextValue = {
      ...contextValue,
      getToken: async (identity, roomName) => {
        const headers = new window.Headers();
        const endpoint = `${process.env.REACT_APP_API_ORIGIN}/call/token`;
        // const endpoint = `https://asia-east2-elites-work-staging.cloudfunctions.net/api/v1/call/token`;
        // const params = new window.URLSearchParams({ identity, roomName });

        return fetch(`${endpoint}/${identity}/${roomName}`, {
          headers,
        }).then(res => res.json());
      },
    };
  }

  const getToken: StateContextType['getToken'] = (name, room) => {
    setIsFetching(true);
    return contextValue
      .getToken(name, room)
      .then((res: any) => {
        setIsFetching(false);
        return res.token;
      })
      .catch(err => {
        setError(err);
        setIsFetching(false);
        return Promise.reject(err);
      });
  };

  return (
    <StateContext.Provider value={{ ...contextValue, getToken }}>
      {props.children}
    </StateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useAppState must be used within the AppStateProvider');
  }
  return context;
}
