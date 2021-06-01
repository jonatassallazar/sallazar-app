import { render, fireEvent, screen } from '../utils/render';
import { LoginPage } from '../../components';
import * as redux from 'react-redux';

it('should have a title', () => {
  render(<LoginPage />, { initialState: {} });
  expect(screen.getByRole('heading')).toHaveTextContent('Faça seu Login');
});

it('should have a description with welcome text', () => {
  render(<LoginPage />, { initialState: {} });
  expect(screen.getByText(/Seja bem-vindo/)).toBeTruthy();
});

it('should dispatch function to login with Google', () => {
  const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
  const mockDispatchFn = jest.fn();
  useDispatchSpy.mockReturnValue(mockDispatchFn);

  render(<LoginPage />);
  fireEvent(
    screen.getByText('Login com Google'),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  );

  expect(mockDispatchFn).toHaveBeenCalled();

  useDispatchSpy.mockClear();
});
