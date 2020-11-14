import { useRef, useEffect, useState, useCallback } from 'react';

type ISpeechRecognition = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  maxAlternatives: number;
  grammars: any;
};

type ISpeechRecognitionHook = {
  onEnd?: () => void;
  onResult: (result: string) => void;
  onStopSpeaking?: () => void;
  onError?: (event: any) => void;
};

const useEventCallback = (
  fn: (args: any) => void,
  dependencies: Array<any> = [],
) => {
  const ref: any = useRef(() => {
    throw new Error('Cannot call an event handler while rendering.');
  });

  useEffect(() => {
    ref.current = fn;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fn, ...dependencies]);

  return useCallback(
    args => {
      const fn = ref.current;
      return fn(args);
    },
    [ref],
  );
};

const useSpeechRecognition = (
  props: ISpeechRecognitionHook = {
    onEnd: Function,
    onResult: Function,
    onStopSpeaking: Function,
    onError: Function,
  },
): {
  listen: (args?: any) => void;
  listening: boolean;
  stop: (args?: any) => void;
  supported: boolean;
} => {
  const {
    onEnd = () => {},
    onStopSpeaking = () => {},
    onResult = () => {},
    onError = () => {},
  } = props;
  const recognition: any = useRef();
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(false);

  const processResult = event => {
    const transcript = Array.from(event.results)
      .map((result: any) => result[0])
      .map(result => result.transcript)
      .join('');

    onResult(transcript);

    // Waiting for until participant stop talking then send the transcript
    for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
      if (event.results[i].isFinal) {
        onStopSpeaking();
      }
    }
  };

  const handleError = event => {
    if (event.error === 'not-allowed') {
      recognition.current.onend = () => {};
      setListening(false);
    }
    onError(event);
  };

  const listen = useEventCallback(
    (
      args: ISpeechRecognition = {
        lang: 'en-US',
        interimResults: true,
        continuous: false,
        maxAlternatives: 1,
        grammars: null,
      },
    ) => {
      if (listening || !supported) return;

      const {
        lang = '',
        interimResults = true,
        continuous = false,
        maxAlternatives = 1,
        grammars,
      } = args;

      setListening(true);
      recognition.current.lang = lang;
      recognition.current.interimResults = interimResults;
      recognition.current.onresult = processResult;
      recognition.current.onerror = handleError;
      recognition.current.continuous = continuous;
      recognition.current.maxAlternatives = maxAlternatives;
      if (grammars) {
        recognition.current.grammars = grammars;
      }
      // SpeechRecognition stops automatically after inactivity
      // We want it to keep going until we tell it to stop
      recognition.current.onend = () => recognition.current.start();
      recognition.current.start();
    },
    [listening, supported, recognition],
  );

  const stop = useEventCallback(() => {
    if (!listening || !supported) return;
    recognition.current.onresult = () => {};
    recognition.current.onend = () => {};
    recognition.current.onerror = () => {};
    setListening(false);
    recognition.current.stop();
    onEnd();
  }, [listening, supported, recognition, onEnd]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.SpeechRecognition =
      window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (window.SpeechRecognition) {
      setSupported(true);
      recognition.current = new window.SpeechRecognition();
    }
  }, []);

  return {
    listen,
    listening,
    stop,
    supported,
  };
};

export default useSpeechRecognition;
