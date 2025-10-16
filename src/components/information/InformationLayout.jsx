import { useState, useEffect } from 'react';
import { store } from '../../store';
import styles from './InformationLayout.module.css';

function InformationLayout() {
	const [currentPlayer, setCurrentPlayer] = useState(store.getState().currentPlayer);
	const [isGameEnded, setIsGameEnded] = useState(store.getState().isGameEnded);
	const [isDraw, setIsDraw] = useState(store.getState().isDraw);

	const getStatusMessage = () => {
		if (isDraw) return 'Ничья';

		if (isGameEnded) {
			return `Победа: ${currentPlayer}`;
		}
		return `Ходит: ${currentPlayer}`;
	};

	useEffect(() => {
		const unsubscribe = store.subscribe(() => {
			const state = store.getState();
			setCurrentPlayer(state.currentPlayer);
			setIsGameEnded(state.isGameEnded);
			setIsDraw(state.isDraw);
		});

		return () => unsubscribe();
	}, []);

	return (
		<div className={styles.infoContainer}>
			<h2 className={styles.infoTitle}>Статус игры</h2>
			<div className={styles.infoMessage}>{getStatusMessage()}</div>
		</div>
	);
}

export default InformationLayout;


