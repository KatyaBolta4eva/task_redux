import Field from './components/field/Field';
import Information from './components/information/Information';
import ResetButton from './components/button/resetButton';

function GameLayout() {
	return (
		<>
			<Information />
			<Field />
			<ResetButton />
		</>
	);
}

export default GameLayout;
