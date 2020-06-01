export const cardsMapper = (
  imagesResponse: UnsplashSearchResponse,
): GameCard[] => {
  const { results } = imagesResponse;
  const gameCards: GameCard[] = [];

  results.forEach((cardInfo: UnsplashSearchPhoto) => {
    const gameCard: GameCard = {
      id: cardInfo.id,
      uniqKey: cardInfo.id,
      author: {
        name: cardInfo.user.name,
        link: cardInfo.user.links.self,
      },
      description: cardInfo.description,
      image: {
        link: cardInfo.urls.regular,
      },
    };

    gameCards.push(gameCard);
  });

  return gameCards;
};
