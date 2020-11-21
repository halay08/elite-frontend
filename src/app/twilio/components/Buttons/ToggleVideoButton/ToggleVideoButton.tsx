import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';

import Button from '@material-ui/core/Button';
import VideoOffIcon from '../../../icons/VideoOffIcon';
import VideoOnIcon from '../../../icons/VideoOnIcon';

import { useHasVideoInputDevices } from '../../../hooks/deviceHooks/deviceHooks';
import useLocalVideoToggle from '../../../hooks/useLocalVideoToggle/useLocalVideoToggle';

export default function ToggleVideoButton(props: {
  disabled?: boolean;
  className?: string;
}) {
  const [isVideoEnabled, toggleVideoEnabled] = useLocalVideoToggle();
  const lastClickTimeRef = useRef(0);
  const hasVideoDevices = useHasVideoInputDevices();

  const { t: translator } = useTranslation();
  const { button: t } = translations.room;

  const toggleVideo = useCallback(() => {
    if (Date.now() - lastClickTimeRef.current > 500) {
      lastClickTimeRef.current = Date.now();
      toggleVideoEnabled();
    }
  }, [toggleVideoEnabled]);

  return (
    <Button
      className={props.className}
      onClick={toggleVideo}
      disabled={!hasVideoDevices || props.disabled}
      startIcon={isVideoEnabled ? <VideoOnIcon /> : <VideoOffIcon />}
    >
      {!hasVideoDevices
        ? translator(t.video.noVideo)
        : isVideoEnabled
        ? translator(t.video.stop)
        : translator(t.video.start)}
    </Button>
  );
}
