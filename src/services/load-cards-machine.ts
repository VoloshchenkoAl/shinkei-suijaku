/* @Factory */
import { createMachine, sendParent, DoneInvokeEvent } from 'xstate';

/* @Services */
import { cardService } from 'services/card-service';

/* @Types */
import { Card } from 'types';

async function loadCard(): Promise<Array<Card>> {
  // TODO: HIDE API WORK LOGIC INSIDE SERVICE
  const { errors, response } = await cardService.photos.getRandom({
    count: 8,
    orientation: 'landscape',
  });

  // TODO: ADD DEFAULT VALUES
  if (errors || !response) {
    return Promise.reject(errors);
  }

  if (!Array.isArray(response)) {
    return Promise.reject();
  }

  return response.map((photo) => ({
    id: photo.id,
    name: `Photo by ${photo.user.name}`,
    thumbnail: photo.urls.regular,
  }));
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
