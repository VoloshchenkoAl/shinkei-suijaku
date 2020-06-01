import { createMachine, assign } from 'xstate';
import { pictureSearchValidation } from 'services/validation/pictureSearch';

const initGameMachine = createMachine<
  InitGameMachineContext,
  InitGameMachineEvent,
  InitGameMachineState
>(
  {
    id: 'initGameMachine',
    initial: 'editing',
    context: {
      value: '',
      error: '',
    },
    states: {
      editing: {
        initial: 'idle',
        states: {
          idle: {},
          invalid: {},
        },
        on: {
          CHANGE: {
            actions: ['clearErrorCode', 'setValue'],
            target: '.idle',
          },
          SUBMIT: 'validating',
        },
      },
      validating: {
        invoke: {
          id: 'validating',
          src: (ctx) => pictureSearchValidation(ctx.value),
          onDone: 'validated',
          onError: {
            target: 'editing.invalid',
            actions: 'setError',
          },
        },
      },
      validated: {
        entry: ['clearErrorCode'],
        invoke: {
          id: 'submitForm',
          src: 'submit',
          onDone: 'editing',
          onError: {
            target: 'editing.invalid',
            actions: 'setError',
          },
        },
      },
    },
  },
  {
    actions: {
      clearErrorCode: assign((ctx) => ({
        ...ctx,
        errorCode: undefined,
      })),
      setValue: assign({
        value: (_, event: any) => event.value,
      }),
      setError: assign({
        error: (_, event: any) => event.data.toString(),
      }),
    },
  },
);

export { initGameMachine };
