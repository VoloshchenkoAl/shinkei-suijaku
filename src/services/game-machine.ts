/* @Factory */
import { assign, createMachine, DoneInvokeEvent } from 'xstate';

/* @Types */
import { Card } from 'types';

/* @Machines */
import { loadCardsMachine } from './load-cards-machine';

type GameCard = Card & {
  initialId: string;
  isFlipped: boolean;
  status: 'matched' | 'assumption' | 'unmatched';
};

const config = {
  delayBeforeHideCards: 3000,
};

type GameMachineContext = {
  cards: Array<GameCard>;
};

type GameMachineEvent =
  | {
      type: 'PREPARE';
    }
  | {
      type: 'LOAD_CARDS_ERROR';
    }
  | {
      type: 'FLIP_CARD';
      id: string;
    }
  | {
      type: 'PLAY_AGAIN';
    };

export const gameMachine = createMachine<GameMachineContext, GameMachineEvent>({
  id: 'gameMachine',
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
            cards: (_, event: DoneInvokeEvent<{ cards: Array<Card> }>) =>
              transformRawDataToGameCards(event.data.cards),
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
      entry: ['onGameReady'],
      initial: 'initializing',
      states: {
        initializing: {
          after: {
            [config.delayBeforeHideCards]: 'flipCard',
          },
        },
        flipCard: {
          entry: assign({
            cards: (context: GameMachineContext) =>
              context.cards.map((card) => ({
                ...card,
                isFlipped: false,
              })),
          }),
          always: 'playing',
        },
        playing: {
          on: {
            FLIP_CARD: {
              actions: assign({
                cards: (context, event) => prepareCard(context.cards, event.id),
              }),
              target: 'checkCard',
            },
          },
        },
        checkCard: {
          always: [
            {
              target: 'playing',
              cond: (context) =>
                context.cards.filter((card) => card.status === 'assumption')
                  .length < 2,
            },
            {
              target: 'checkWin',
              cond: (context) => {
                const assumptionCards = context.cards
                  .filter((card) => card.status === 'assumption')
                  .map((card) => card.initialId);

                return new Set(assumptionCards).size === 1;
              },
              actions: assign({
                cards: (context) =>
                  context.cards.map((card) => {
                    if (card.status === 'assumption') {
                      return {
                        ...card,
                        status: 'matched',
                      };
                    }

                    return card;
                  }),
              }),
            },
            {
              target: 'delayPlay',
            },
          ],
        },
        delayPlay: {
          after: {
            1000: {
              target: 'playing',
            },
          },
          exit: assign({
            cards: (context) =>
              context.cards.map((card) => {
                if (card.status === 'assumption') {
                  return {
                    ...card,
                    isFlipped: false,
                    status: 'unmatched',
                  };
                }

                return card;
              }),
          }),
        },
        checkWin: {
          always: [
            {
              target: '#gameMachine.win',
              cond: (context) =>
                context.cards.filter((card) => card.status === 'matched')
                  .length === context.cards.length,
            },
            {
              target: 'playing',
            },
          ],
        },
      },
    },
    win: {
      entry: ['onGameWin', assign({ cards: () => [] })],
    },
    loadCardsError: {
      type: 'final',
    },
  },
  on: {
    PLAY_AGAIN: {
      target: 'idle',
      actions: ['onGamePlayAgain'],
    },
  },
});

function transformRawDataToGameCards(cards: Array<Card>): Array<GameCard> {
  const transformedCards = [...cards, ...cards].map((card) => ({
    ...card,
    initialId: card.id,
    id: crypto.randomUUID(),
    isFlipped: true,
    status: 'unmatched' as const,
  }));

  for (let i = transformedCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [transformedCards[i], transformedCards[j]] = [
      transformedCards[j],
      transformedCards[i],
    ];
  }

  return transformedCards;
}

function prepareCard(cards: Array<GameCard>, id: string): Array<GameCard> {
  return cards.map((card) => {
    if (card.id === id && card.status !== 'matched') {
      return {
        ...card,
        status: 'assumption' as const,
        isFlipped: true,
      };
    }

    return card;
  });
}
