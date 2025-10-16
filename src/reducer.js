import { INITIAL_GAME_STATE, INITIAL_PLAYER } from './GameConstants';

const initialState = {
	field: INITIAL_GAME_STATE,
	currentPlayer: INITIAL_PLAYER,
	isGameEnded: false,
	isDraw: false,
};

export const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'SET_CURRENT_PLAYER':
			return {
				...state,
				currentPlayer: payload,
			};
		case 'SET_FIELD':
			return {
				...state,
				field: payload,
			};
		case 'SET_IS_GAME_ENDED':
			return {
				...state,
				isGameEnded: payload,
			};
		case 'SET_IS_DRAW':
			return {
				...state, isDraw: payload
			};
		case 'RESTART_GAME':
			return initialState;
		default:
			return state;
	}
};
