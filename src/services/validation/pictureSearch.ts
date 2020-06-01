const VALID_SEARCH_REGEXP = /\w./;

function pictureSearchValidation(
  value: string,
): Promise<'EMPTY' | 'INVALID_CHARACTERS'> {
  return new Promise((resolve, reject) => {
    if (value.length === 0) {
      reject('EMPTY');
    } else if (!VALID_SEARCH_REGEXP.test(value)) {
      reject('INVALID_CHARACTERS');
    } else {
      resolve();
    }
  });
}

export { pictureSearchValidation };
