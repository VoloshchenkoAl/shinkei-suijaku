import { createMachine, assign } from 'xstate';

const maxAttempts = 3;
const matchCards = 2;
const checkDelay = 500;

const gameMachine = createMachine<
  GameMachineContext,
  GameMachineState,
  GameMachineEvent
>(
  {
    id: 'gameMachine',
    initial: 'start',
    context: {
      sourceCard: [],
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
          PLAY: {
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
      gameOver: {
        entry: 'gameOver',
      },
      win: {
        entry: 'gameWin',
      },
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
        forceOpenedCards: () => false,
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

          return gameCards.sort(() => Math.random() - 0.5);
        },
        sourceCard: (ctx, event) => (event as SetCardsEvent).cards,
      }),
      setRoundMatch: assign({
        roundMatch: (ctx, event) =>
          ctx.roundMatch.concat((event as MatchEvent).cardImprint),
      }),
      updateCardsInfo: assign((ctx) => {
        const { openCards, attempts, roundMatch } = ctx;
        const isCardsSame = roundMatch.every(
          (card) => card.id === roundMatch[0].id
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
      gameOverCheck: (ctx) => ctx.attempts >= maxAttempts,
      winCheck: (ctx) => ctx.openCards.length === ctx.cards.length,
    },
  }
);

export { gameMachine };
