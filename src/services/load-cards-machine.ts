/* @Factory */
import { createMachine, sendParent, DoneInvokeEvent } from 'xstate';

/* @Types */
import { Card } from 'types';

function loadCard(): Promise<Array<Card>> {
  const card = {
    id: '1',
    name: 'card 1',
    thumbnail: '',
  };
  const cards: Array<Card> = [card];

  return Promise.resolve(cards);
}

type LoadCardsMachineContext = null;
type LoadCardsMachineEvents = { type: 'LOAD' };

export const loadCardsMachine = createMachine<
  LoadCardsMachineContext,
  LoadCardsMachineEvents
>({
  initial: 'loading',
  states: {
    loading: {
      invoke: {
        src: () => loadCard(),
        id: 'loadingData',
        onDone: {
          target: 'success',
        },

        onError: {
          target: 'error',
        },
      },
    },
    success: {
      type: 'final',
      data: {
        cards: (
          _context: LoadCardsMachineContext,
          event: DoneInvokeEvent<Array<Card>>
        ) => event.data,
      },
    },
    error: {
      entry: sendParent('ERROR'),
    },
  },
});
