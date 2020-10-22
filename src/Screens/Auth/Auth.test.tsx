import { render, fireEvent } from 'react-native-testing-library';
import { AuthContainer } from './AuthContainer';


test('testing form inputs', () => {
    const { getAllByA11yLabel, getByText } = render(
        <AuthContainer navigation={null} route={null}/>
    )

    getByText("Войти")
});