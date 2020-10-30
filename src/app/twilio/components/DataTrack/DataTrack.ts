import { useEffect } from 'react';
import { DataTrack as IDataTrack } from 'twilio-video';
import { useAppState } from '../../state';

export default function DataTrack({ track }: { track: IDataTrack }) {
  const { messages: chatLog, setMessage, setNotificationCount } = useAppState();

  useEffect(() => {
    const handleMessage = (message: string) => {
      setMessage(JSON.parse(message));
      setNotificationCount(1);
    };

    track.on('message', handleMessage);
    return () => {
      track.off('message', handleMessage);
    };
  }, [track, setMessage, chatLog, setNotificationCount]);

  return null; // This component does not return any HTML, so we will return 'null' instead.
}
