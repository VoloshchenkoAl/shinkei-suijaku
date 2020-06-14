import { State } from 'xstate';

export type GameState = State<
  GameMachineContext,
  GameMachineEvent,
  any,
  { value: any; context: GameMachineContext }
>;
