const VALID_SEARCH_REGEXP = /\w./;

function pictureSearchValidation(
  value: string
): Promise<'EMPTY' | 'INVALID_CHARACTERS' | boolean> {
  return new Promise((resolve, reject) => {
    if (value.length === 0) {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('EMPTY');
    } else if (!VALID_SEARCH_REGEXP.test(value)) {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('INVALID_CHARACTERS');
    } else {
      resolve(true);
    }
  });
}

export { pictureSearchValidation };
