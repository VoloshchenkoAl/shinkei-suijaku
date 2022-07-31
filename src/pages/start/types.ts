export type StartComponentProps = {
  handleInputChange: (value: string) => void;
  handleSearchImages: () => void;
  value: string;
  searchValidationError: string;
};

export type StartContainerProps = {
  handleLoadCars: (cards: GameCard[]) => void;
};
