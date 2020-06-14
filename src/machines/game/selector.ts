/* @Types */
import { GameState } from 'machines/game/types';

export const isCardsExistsSelector = (
  gameContext: GameMachineContext,
): boolean => {
  const { sourceCard } = gameContext;

  return sourceCard.length > 0;
};

export const isGameOverSelector = (gameState: GameState): boolean =>
  gameState.matches('gameOver');

export const isGameWinSelector = (gameState: GameState): boolean =>
  gameState.matches('win');
