import { useEffect } from 'react';
import { DataTrack as IDataTrack } from 'twilio-video';
import { useAppState } from '../../state';
import { IDataTrackCommunication } from '../../types';

export default function DataTrack({ track }: { track: IDataTrack }) {
  const {
    setMessage,
    setNotificationCount,
    setCaption,
    setToggleCaption,
  } = useAppState();

  useEffect(() => {
    const handleMessage = (message: string) => {
      const msg: IDataTrackCommunication = JSON.parse(message);
      const { type, message: receivedMessage } = msg;

      if (type === 'chat') {
        setMessage(msg);
        setNotificationCount(1);
      }

      if (type === 'caption') {
        setCaption(msg);
      }

      if (type === 'request-toggle-caption') {
        setToggleCaption(receivedMessage === 'true' ? true : false);
      }
    };

    track.on('message', handleMessage);
    return () => {
      track.off('message', handleMessage);
    };
  }, [track, setMessage, setNotificationCount, setCaption, setToggleCaption]);

  return null; // This component does not return any HTML, so we will return 'null' instead.
}
