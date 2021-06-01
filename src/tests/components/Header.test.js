import { render, fireEvent, screen } from '../utils/render';
import { Header } from '../../components';
import * as redux from 'react-redux';
import authUser from '../fixtures/authUser';

it('should have a display name', () => {
  render(<Header />, { initialState: { auth: authUser } });
  expect(screen.getByRole('heading')).toHaveTextContent('Alpha Beta');
});

it('should have a email', () => {
  render(<Header />, { initialState: { auth: authUser } });
  expect(screen.getByText('test@test.com')).toBeTruthy();
});

it('should have a profile photo', () => {
  render(<Header />, { initialState: { auth: authUser } });
  expect(screen.getByRole('img', { name: 'Alpha Beta' })).toBeTruthy();
  expect(screen.getByRole('img', { name: 'Alpha Beta' })).toHaveAttribute(
    'src',
    'https://picsum.photos/100/100'
  );
});

it('should dispatch logout on click', () => {
  const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
  const mockDispatchFn = jest.fn();
  useDispatchSpy.mockReturnValue(mockDispatchFn);

  render(<Header />);
  fireEvent(
    screen.getByText('Sair'),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  );

  expect(mockDispatchFn).toHaveBeenCalled();

  useDispatchSpy.mockClear();
});
