export type CardProps = GameCard & {
  isRevealed: boolean;
  onClick: (cardImprint: CardImprint) => void;
};
