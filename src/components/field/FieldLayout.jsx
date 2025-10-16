import { useState, useEffect } from 'react';
import { WIN_PATTERNS } from '../../GameConstants';
import { store } from '../../store';
import styles from './FieldLayout.module.css';

function FieldLayout() {
	const [currentPlayer, setCurrentPlayer] = useState(store.getState().currentPlayer);
	const [isGameEnded, setIsGameEnded] = useState(store.getState().isGameEnded);
	const [isDraw, setIsDraw] = useState(store.getState().isDraw);
	const [field, setField] = useState(store.getState().field);

	const onClick = (item, index) => {
		if (item !== '' || isGameEnded) return;

		const newField = [...field];
		newField[index] = currentPlayer;

		store.dispatch({ type: 'SET_FIELD', payload: newField });

		const hasWinner = WIN_PATTERNS.some((indexes) => {
			const valid = newField[indexes[0]];
			if (!valid) return false;

			return indexes.every((idx) => newField[idx] === valid);
		});

		if (hasWinner) {
			store.dispatch({ type: 'SET_IS_GAME_ENDED', payload: true });
			return;
		}

		const hasNoEmptyStrings = newField.every((el) => el !== '');

		if (hasNoEmptyStrings) {
			store.dispatch({ type: 'SET_IS_DRAW', payload: true });
			return;
		}
		const newCurrentPlayer = store.getState().currentPlayer === 'X' ? 'O' : 'X';
		store.dispatch({ type: 'SET_CURRENT_PLAYER', payload: newCurrentPlayer });
	};

	useEffect(() => {
		const unsubscribe = store.subscribe(() => {
			const state = store.getState();
			setField(state.field);
			setIsGameEnded(state.isGameEnded);
			setIsDraw(state.isDraw);
			setCurrentPlayer(state.currentPlayer);
		});

		return () => unsubscribe();
	}, []);

	return (
		<div className={styles.grid}>
			{field.map((item, index) => (
				<button
					key={index}
					className={styles.cell}
					onClick={() => onClick(item, index)}
				>
					{item}
				</button>
			))}
		</div>
	);
}

export default FieldLayout;
