import { translations } from 'locales/i18n';

const modifyErrorMessage = errorMessage => errorMessage.replace(/\./g, '');

const getTranslatedError = (translator, errorMessage) => {
  const { errorMessages } = translations;
  return (
    translator(errorMessages[modifyErrorMessage(errorMessage)]) || errorMessage
  );
};

export { modifyErrorMessage, getTranslatedError };
