import { useState, useCallback } from 'react';

const useChat = () => {
  const [messages, _setMessage] = useState<Array<string[]>>([]);
  const [notificationCount, _setNotificationCount] = useState<number>(0);

  const setMessage = useCallback(
    (msg: string[]) => {
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
