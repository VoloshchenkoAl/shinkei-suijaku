/* @Factory */
import { assign, createMachine, DoneInvokeEvent } from 'xstate';

/* @Types */
import { Card } from 'types';

/* @Machines */
import { loadCardsMachine } from './load-cards-machine';

type GameMachineContext = {
  cards: Array<Card>;
};

type GameMachineEvent =
  | {
      type: 'PREPARE';
    }
  | {
      type: 'LOAD_CARDS_ERROR';
    };

export const gameMachine = createMachine<GameMachineContext, GameMachineEvent>({
  context: {
    cards: [],
  },
  initial: 'idle',
  states: {
    idle: {
      on: {
        PREPARE: 'preparing',
      },
    },
    preparing: {
      invoke: {
        id: 'loadCard',
        src: loadCardsMachine,
        onDone: {
          target: 'game',
          actions: assign({
            cards: (_, event: DoneInvokeEvent<Array<Card>>) => event.data,
          }),
        },
      },
      on: {
        LOAD_CARDS_ERROR: {
          target: 'loadCardsError',
        },
      },
    },
    game: {
      type: 'final',
    },
    loadCardsError: {
      type: 'final',
    },
  },
});
