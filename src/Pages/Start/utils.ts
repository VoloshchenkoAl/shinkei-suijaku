export const getValidationText = (
  errorCode: SEARCH_ERROR_CODE,
): string => {
  if (errorCode === 'EMPTY') {
    return 'Field is empty';
  } else if (errorCode === 'INVALID_CHARACTERS') {
    return 'Try to change your characters';
  } else if (errorCode === 'NO_RESULT') {
    return 'Can not find any photos';
  }

  return errorCode;
};
