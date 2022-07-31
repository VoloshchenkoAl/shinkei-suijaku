import React from 'react';

/* @Components */
import { Input } from 'components/input';
import { Button } from 'components/button';

/* @Types */
import { StartComponentProps } from './types';

/* @Styles */
import './start.css';

const StartComponent: React.FunctionComponent<StartComponentProps> = (
  props
) => {
  const {
    handleInputChange,
    handleSearchImages,
    value,
    searchValidationError,
  } = props;

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearchImages();
  };

  return (
    <div className="start-game__container">
      <h1>Write any word to start to play the game</h1>

      <form onSubmit={onSubmit} className="start-game__form">
        <Input
          value={value}
          onChange={handleInputChange}
          error={searchValidationError}
        />
        <Button type="submit">start game!</Button>
      </form>
    </div>
  );
};

export { StartComponent };
