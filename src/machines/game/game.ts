import { Machine, assign } from 'xstate';

const maxAttempts: number = 3;
const matchCards: number = 2;
const checkDelay: number = 1000;

const gameMachine = Machine<
  GameMachineContext,
  GameMachineState,
  GameMachineEvent
>(
  {
    id: 'gameMachine',
    initial: 'start',
    context: {
      cards: [],
      attempts: 0,
      roundMatch: [],
      openCards: [],
      forceOpenedCards: true,
    },
    states: {
      start: {
        on: {
          SET_CARDS: {
            target: 'prepare',
            actions: 'setCards',
          },
        },
      },
      prepare: {
        on: {
          START_GAME: {
            target: 'playing',
            actions: 'hideForceOpenedCards',
          },
        },
      },
      playing: {
        initial: 'idle',
        states: {
          idle: {
            on: {
              MATCH: {
                actions: 'setRoundMatch',
                target: 'roundMatch',
              },
            },
          },
          roundMatch: {
            after: {
              [checkDelay]: [
                {
                  target: 'gameMatch',
                  cond: 'checkRound',
                },
                { target: 'idle' },
              ],
            },
          },
          gameMatch: {
            entry: 'updateCardsInfo',
            on: {
              '': [
                {
                  target: '#gameMachine.gameOver',
                  cond: 'gameOverCheck',
                },
                {
                  target: '#gameMachine.win',
                  cond: 'winCheck',
                },
                { target: 'idle' },
              ],
            },
          },
        },
      },
      gameOver: {},
      win: {},
      exit: {
        type: 'final',
      },
    },
    on: {
      EXIT_GAME: {
        target: 'exit',
      },
      PLAY_AGAIN: {
        target: 'playing',
        actions: 'resetGame',
      },
    },
  },
  {
    actions: {
      hideForceOpenedCards: assign({
        forceOpenedCards: (ctx, event) => false,
      }),
      setCards: assign({
        cards: (ctx, event) => {
          let gameCards: GameCard[] = [];
          const { cards } = event as SetCardsEvent;

          for (let i = 0; i < matchCards; i++) {
            gameCards = [...gameCards, ...cards];
          }

          gameCards = gameCards.map((card, index) => ({
            ...card,
            uniqKey: card.uniqKey + index,
          }));

          return gameCards;
        },
      }),
      setRoundMatch: assign({
        roundMatch: (ctx, event) =>
          ctx.roundMatch.concat((event as MatchEvent).cardImprint),
      }),
      updateCardsInfo: assign((ctx) => {
        const { openCards, attempts, roundMatch } = ctx;
        const isCardsSame = roundMatch.every(
          (card) => card.id === roundMatch[0].id,
        );

        if (isCardsSame) {
          return {
            ...ctx,
            roundMatch: [],
            openCards: [...openCards, ...roundMatch],
          };
        }

        return {
          ...ctx,
          roundMatch: [],
          attempts: attempts + 1,
        };
      }),
      resetGame: assign((ctx) => ({
        ...ctx,
        attempts: 0,
        openCards: [],
        roundMatch: [],
      })),
    },
    guards: {
      checkRound: (ctx) => matchCards === ctx.roundMatch.length,
      gameOverCheck: (ctx) => ctx.attempts === maxAttempts,
      winCheck: (ctx) => ctx.openCards.length === ctx.cards.length,
    },
  },
);

export { gameMachine };
