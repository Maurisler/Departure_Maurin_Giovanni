import { render } from '@testing-library/react';
import Main from '../components/Main/Main';

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
      <Main />
  );
  //Check that the loads without any problems
});
