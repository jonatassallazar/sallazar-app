import { render, fireEvent, screen } from '../utils/render';
import { LoginPage } from '../../components';
import * as redux from 'react-redux';

it('should have a title', () => {
  render(<LoginPage />);
  expect(screen.getByRole('heading')).toHaveTextContent('Faça seu Login');
});

it('should have a description with welcome text', () => {
  render(<LoginPage />);
  expect(screen.getByText(/Seja bem-vindo/)).toBeTruthy();
});

it('should dispatch function to login with Google', () => {
  const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
  const mockDispatchFn = jest.fn();
  useDispatchSpy.mockReturnValue(mockDispatchFn);

  render(<LoginPage />);
  fireEvent.click(screen.getByText('Login com Google'));

  expect(mockDispatchFn).toHaveBeenCalled();

  useDispatchSpy.mockClear();
});
