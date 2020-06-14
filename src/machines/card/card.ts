import { Machine } from 'xstate';

const cardMachine = Machine<CardState, CardEvent>({
  id: 'cardMachine',
  initial: 'unguessed',
  states: {
    revealed: {
      on: {
        DETAIL: {
          target: 'detailed',
        },
      },
    },
    unguessed: {
      on: {
        REVEAL: {
          target: 'revealed',
        },
      },
    },
    detailed: {
      on: {
        REVEAL_DETAILED: {
          target: 'revealed',
        },
      },
    },
  },
  on: {
    UNGUESSED: {
      target: 'unguessed',
    },
  },
});

export { cardMachine };
