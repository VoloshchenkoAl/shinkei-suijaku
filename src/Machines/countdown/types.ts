export type CountdownMachineState = {
  states: {
    idle: {};
    start: {
      states: {
        countdown: {};
        checkCountdown: {};
      };
    };
    end: {};
  };
};

export interface CountdownMachineContext {
  timer: number;
}

export type CountdownMachineEvent = { type: 'START' } | { type: 'RESTART' };
