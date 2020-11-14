import { useState, useCallback } from 'react';
import { IDataTrackCommunication } from '../../types';

const useChat = () => {
  const [messages, _setMessage] = useState<
    Array<Partial<IDataTrackCommunication>>
  >([]);
  const [notificationCount, _setNotificationCount] = useState<number>(0);

  const setMessage = useCallback(
    (msg: Partial<IDataTrackCommunication>) => {
      _setMessage(messages => [...messages, msg]);
    },
    [_setMessage],
  );

  const setNotificationCount = useCallback(
    (count: number) => {
      const counter = count === 0 ? 0 : notificationCount + count;
      _setNotificationCount(counter);
    },
    [notificationCount],
  );

  return [
    messages,
    setMessage,
    notificationCount,
    setNotificationCount,
  ] as const;
};

export default useChat;
