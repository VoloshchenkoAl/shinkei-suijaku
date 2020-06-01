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
        UNGUESSED: {
          target: 'unguessed',
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
        REVEAL: {
          target: 'revealed',
        },
      },
    },
  },
});

export { cardMachine };
