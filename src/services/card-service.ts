/* @Fabric */
import { createApi } from 'unsplash-js';

/* @Config */
import { UNSPLASH_ACCESS_KEY } from 'config';

export const cardService = createApi({
  accessKey: UNSPLASH_ACCESS_KEY,
});
