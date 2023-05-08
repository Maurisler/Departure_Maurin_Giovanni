import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Login from '../components/Login/Login';
import { Alert } from 'bootstrap';
import { useTranslation } from "react-i18next";
import { i18n } from '../services/i18n';
import { createMemoryHistory } from 'history';


const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

const react_i18next = jest.genMockFromModule('react-i18next')
const translate = () => Component => props => <Component t={() => ''} {...props} />
react_i18next.translate = translate
module.exports = react_i18next

test("renders the component", () => {
  render(
      <Login />
  );
  //Check that the loads without any problems
});

test("Fail login", async () => {
    const history = createMemoryHistory();
    history.push = jest.fn();

    render(
        <Login />
    );
    const addtoBartButton = screen.getByTestId("submit");
    const email = screen.getByTestId("email");
    const password = screen.getByTestId("password");
    fireEvent.change(email, {target: {value: ''}})
    fireEvent.change(password, {target: {value: ''}})
    fireEvent.click(addtoBartButton);

    //Check that the site didn't change (successfull login) if no credentials were provided
    expect(history.push).toHaveBeenCalledTimes(0);
});