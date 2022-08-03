/* React scope */
import { createContext, PropsWithChildren } from 'react';
import { useInterpret } from '@xstate/react';
import { useNavigate } from 'react-router-dom';

/* @Types */
import type { InterpreterFrom } from 'xstate';

/* @Service */
import { gameMachine } from 'services/game-machine';

export const GameStateContext = createContext<{
  gameService: InterpreterFrom<typeof gameMachine>;
}>({ gameService: null as unknown as InterpreterFrom<typeof gameMachine> });

export function GameProvider(props: PropsWithChildren) {
  const navigate = useNavigate();
  const gameService = useInterpret(gameMachine, {
    actions: {
      onGameReady: () => {
        navigate('/game');
      },
    },
  });
  const { children } = props;

  return (
    <GameStateContext.Provider value={{ gameService }}>
      {children}
    </GameStateContext.Provider>
  );
}
