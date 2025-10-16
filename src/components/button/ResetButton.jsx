import { store } from '../../store';
import styles from './ResetButton.module.css';

function ResetButton() {
	const startOverButtonClick = () => {
		store.dispatch({ type: 'RESTART_GAME' });
	};

	return (
		<div className={styles.resetContainer}>
			<button className={styles.resetButton} onClick={startOverButtonClick}>
				Начать заново
			</button>
		</div>
	);
}

export default ResetButton;
