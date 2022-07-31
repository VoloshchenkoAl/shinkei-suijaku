export type GameComponentProps = {
  cards: GameCard[];
  openedCards: CardImprint[];
  handleClick: (cardImprint: CardImprint) => void;
  forceOpenedCards: boolean;
  attempts: number;
  countdownTime: number;
  isCountdownEnd: boolean;
};
