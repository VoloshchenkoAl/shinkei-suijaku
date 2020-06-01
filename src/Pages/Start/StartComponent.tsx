import React from 'react';

/* @Components */
import { Input } from 'components/Input';
import { Button } from 'components/Button';

type StartComponentProps = {
  handleInputChange: (value: string) => void;
  handleSearchImages: () => void;
  value: string;
  searchValidationError: string;
};

const StartComponent: React.FunctionComponent<StartComponentProps> = (
  props,
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
    <div>
      <h1>Try to find any words, for starting your first game</h1>

      <form onSubmit={onSubmit}>
        <Input
          value={value}
          onChange={handleInputChange}
          label="Type any words"
          error={searchValidationError}
        />
        <br />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export { StartComponent };
