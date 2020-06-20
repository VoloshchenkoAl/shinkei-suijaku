import { Machine, assign } from 'xstate';

/* @Types */
import {
  CountdownMachineState,
  CountdownMachineContext,
  CountdownMachineEvent,
} from './types';

/* @Constants */
const COUNTDOWN_VALUE = 5000;
const COUNTDOWN_END_VALUE = 0;
const TICK_VALUE = 1000;

export const countdownMachine = Machine<
  CountdownMachineContext,
  CountdownMachineState,
  CountdownMachineEvent
>(
  {
    id: 'countdown',
    initial: 'idle',
    context: {
      timer: COUNTDOWN_VALUE,
    },
    states: {
      idle: {
        on: {
          START: {
            target: 'start',
          },
        },
      },
      start: {
        initial: 'countdown',
        states: {
          countdown: {
            after: {
              [TICK_VALUE]: {
                target: 'checkCountdown',
                actions: 'countdownTick',
              },
            },
          },
          checkCountdown: {
            on: {
              '': [
                {
                  target: '#countdown.end',
                  cond: 'checkCountdown',
                },
                {
                  target: 'countdown',
                },
              ],
            },
          },
        },
      },
      end: {
        entry: 'countdownEnd',
        on: {
          RESTART: {
            target: 'start',
            actions: ['restartTimer'],
          },
        },
      },
    },
  },
  {
    actions: {
      restartTimer: assign({
        timer: () => COUNTDOWN_VALUE,
      }),
      countdownTick: assign({
        timer: (context) => context.timer - TICK_VALUE,
      }),
    },
    guards: {
      checkCountdown: (context) =>
        context.timer === COUNTDOWN_END_VALUE,
    },
  },
);
