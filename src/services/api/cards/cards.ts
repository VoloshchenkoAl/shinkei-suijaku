/* @Helpers */
import { makeRequest } from 'services/api/helpers/request';

/* @Mappers */
import { cardsMapper } from './mapper';

export const cardsApi = {
  async get(searchValue: string): Promise<GameCard[]> {
    const url = 'https://api.unsplash.com/search/photos';
    const method = 'GET';
    const headers = {
      Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_AUTH_KEY}`,
    };
    const query = {
      query: searchValue,
      orientation: 'landscape',
    };

    const data: UnsplashSearchResponse = await makeRequest({
      url,
      method,
      headers,
      query,
    });

    return cardsMapper(data);
  },
};
