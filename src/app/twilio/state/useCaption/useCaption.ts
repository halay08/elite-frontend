import { useState, useCallback } from 'react';
import { IDataTrackCommunication } from '../../types';

const useCaption = () => {
  const [caption, _setCaption] = useState<
    Array<Partial<IDataTrackCommunication>>
  >([]);

  const [toggleCaption, _setToggleCaption] = useState<boolean>(false);

  const setCaption = useCallback(
    (msg: Partial<IDataTrackCommunication>) => {
      _setCaption(messages => [...messages, msg]);
    },
    [_setCaption],
  );

  const setToggleCaption = useCallback(
    (state: boolean) => {
      _setToggleCaption(state);
    },
    [_setToggleCaption],
  );

  return [caption, setCaption, toggleCaption, setToggleCaption] as const;
};

export default useCaption;
