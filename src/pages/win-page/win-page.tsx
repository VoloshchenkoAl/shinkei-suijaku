/* React Scope */
import { useContext } from 'react';
import { GameStateContext } from 'game-provider';
import { useActor } from '@xstate/react';
import { Navigate } from 'react-router-dom';

function WinPage() {
  const { gameService } = useContext(GameStateContext);
  const [state, send] = useActor(gameService);

  if (!state.matches('win')) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <h1 className="text-2xl font-medium mb-4">
        Congratulation! You won the game 🎉
      </h1>
      <footer className="text-center">
        <button
          className="border-2 border-black py-2 px-4 font-mono uppercase"
          type="button"
          onClick={() => send('PLAY_AGAIN')}
        >
          Play again 🎮
        </button>
      </footer>
    </>
  );
}

export default WinPage;
