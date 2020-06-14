import React from 'react';
import { useMachine } from '@xstate/react';

/* @Types */
import { StartContainerProps } from './types';

/* @Machine */
import { initGameMachine } from 'machines/initGame';

/* @Components */
import { StartComponent } from './StartComponent';

/* @Api */
import { cardsApi } from 'services/api/cards';

/* @Utils */
import { getValidationText } from './utils';

const StartContainer: React.FunctionComponent<StartContainerProps> = (
  props,
) => {
  const { handleLoadCars } = props;

  const [state, send] = useMachine(initGameMachine, {
    services: {
      async submit(ctx) {
        const cards = await cardsApi.get(ctx.value);
        handleLoadCars(cards);
      },
    },
  });

  const onChangeInputValue = (value: string): void => {
    send({ type: 'CHANGE', value });
  };

  const onSearchImages = (): void => {
    send({ type: 'SUBMIT' });
  };

  const searchValidationError = getValidationText(
    state.context.error,
  );

  return (
    <StartComponent
      searchValidationError={searchValidationError}
      handleInputChange={onChangeInputValue}
      value={state.context.value}
      handleSearchImages={onSearchImages}
    />
  );
};

export { StartContainer };
