type SEARCH_ERROR_CODE =
  | 'EMPTY'
  | 'INVALID_CHARACTERS'
  | 'NO_RESULT'
  | string;

interface GameCard {
  id: string;
  uniqKey: string;
  description: string;
  image: {
    link: string;
  };
  author: {
    name: string;
    link: string;
  };
}

interface CardImprint {
  id: string;
  uniqKey: string;
}

/**
 * Game Machine
 */
interface GameMachineContext {
  sourceCard: GameCard[];
  cards: GameCard[];
  attempts: number;
  roundMatch: CardImprint[];
  openCards: CardImprint[];
  forceOpenedCards: boolean;
}

type GameMachineState = {
  states: {
    start: {};
    prepare: {};
    playing: {
      states: {
        idle: {};
        roundMatch: {};
        gameMatch: {};
      };
    };
    gameOver: {};
    win: {};
    exit: {};
  };
};

type SetCardsEvent = { type: 'SET_CARDS'; cards: GameCard[] };

type MatchEvent = { type: 'MATCH'; cardImprint: CardImprint };

type GameMachineEvent =
  | SetCardsEvent
  | MatchEvent
  | { type: 'PLAY' }
  | { type: 'EXIT_GAME' }
  | { type: 'PLAY_AGAIN' };

/**
 * InitGame machine
 */
interface InitGameMachineContext {
  value: string;
  error: SEARCH_ERROR_CODE;
}

type InitGameMachineState =
  | {
      value: 'editing.idle';
      context: InitGameMachineContext;
    }
  | {
      value: 'editing.invalid';
      context: InitGameMachineContext;
    }
  | {
      value: 'validating';
      context: InitGameMachineContext;
    }
  | {
      value: 'validated';
      context: InitGameMachineContext;
    };

type InitGameMachineEvent =
  | { type: 'CHANGE'; value: string }
  | { type: 'SUBMIT' };

/**
 * Card machine
 */
type CardState = {
  states: {
    revealed: {};
    detailed: {};
  };
};

type CardEvent =
  | { type: 'REVEAL' }
  | { type: 'DETAIL' }
  | { type: 'REVEAL_DETAILED' }
  | { type: 'UNGUESSED' };

/**
 * Types from unsplash
 *
 * Only part from original unsplash search photo response
 */
interface UnsplashSearchPhoto {
  id: string;
  width: number;
  height: number;
  description: string;
  user: {
    id: string;
    name: string;
    links: {
      self: string;
      html: string;
      photos: string;
      likes: string;
    };
  };
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
}

interface UnsplashSearchResponse {
  total: number;
  total_pages: number;
  results: UnsplashSearchPhoto[];
}
