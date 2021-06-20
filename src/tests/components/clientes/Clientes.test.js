import { render, fireEvent, screen, history } from '../../utils/render';
import { Clientes } from '../../../components';
import * as redux from 'react-redux';
import clientes from '../../fixtures/clientes';

const initialState = {
  clientes,
};

const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
let mockDispatchFn = jest.fn(() => Promise.resolve());

beforeEach(() => {
  mockDispatchFn = jest.fn(() => Promise.resolve());
  useDispatchSpy.mockReturnValue(mockDispatchFn);
});

afterEach(() => {
  useDispatchSpy.mockClear();
});

it('should have a list title', () => {
  render(<Clientes />, { initialState });

  expect(screen.getByRole('heading')).toHaveTextContent('Lista de Clientes');
});

it('should have a button to add a new client', () => {
  render(<Clientes />, { initialState });

  expect(screen.getByRole('button', { name: 'Novo Cliente' })).toBeInTheDocument();
});

it('should have a table', () => {
  render(<Clientes />, { initialState });

  expect(screen.getByRole('table')).toBeInTheDocument();
});

it('should have a edit button', () => {
  render(<Clientes />, { initialState });

  expect(screen.getByTestId('edit-button0')).toBeInTheDocument();
});

it('should redirect to edit page', () => {
  render(<Clientes />, { initialState });

  history.push('/clientes');

  fireEvent.click(screen.getByTestId('edit-button0'));

  expect(history.location.pathname).toBe('/clientes/editar/123abc');
});

it('should have a delete button', () => {
  render(<Clientes />, { initialState });

  expect(screen.getByTestId('delete-button0')).toBeInTheDocument();
});

it('should dispatch function to delete row', () => {
  render(<Clientes />, { initialState });

  expect(mockDispatchFn).toHaveBeenCalledTimes(1);

  fireEvent.click(screen.getByTestId('delete-button0'));
  fireEvent.click(screen.getByTestId('btn-secondary-modal'));

  expect(mockDispatchFn).toHaveBeenCalledTimes(2);
});

it('should dispatch function on load component to set clients', () => {
  render(<Clientes />, { initialState });

  expect(mockDispatchFn).toHaveBeenCalledTimes(1);
});
