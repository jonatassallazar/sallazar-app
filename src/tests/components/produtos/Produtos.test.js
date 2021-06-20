import { render, fireEvent, screen, history } from '../../utils/render';
import { Produtos } from '../../../components';
import * as redux from 'react-redux';
import produtos from '../../fixtures/produtos';

const initialState = {
  produtos,
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
  render(<Produtos />, { initialState });

  expect(screen.getByRole('heading')).toHaveTextContent('Lista de Produtos');
});

it('should have a button to add a new product', () => {
  render(<Produtos />, { initialState });

  expect(
    screen.getByRole('button', { name: 'Novo Produto' })
  ).toBeInTheDocument();
});

it('should have a table', () => {
  render(<Produtos />, { initialState });

  expect(screen.getByRole('table')).toBeInTheDocument();
});

it('should have a edit button', () => {
  render(<Produtos />, { initialState });

  expect(screen.getByTestId('edit-button0')).toBeInTheDocument();
});

it('should redirect to edit page', () => {
  render(<Produtos />, { initialState });

  history.push('/produtos');

  fireEvent.click(screen.getByTestId('edit-button0'));

  expect(history.location.pathname).toBe('/produtos/editar/123abc');
});

it('should have a delete button', () => {
  render(<Produtos />, { initialState });

  expect(screen.getByTestId('delete-button0')).toBeInTheDocument();
});

it('should dispatch function to delete row', () => {
  render(<Produtos />, { initialState });

  expect(mockDispatchFn).toHaveBeenCalledTimes(1);

  fireEvent.click(screen.getByTestId('delete-button0'));
  fireEvent.click(screen.getByTestId('btn-secondary-modal'));

  expect(mockDispatchFn).toHaveBeenCalledTimes(2);
});

it('should dispatch function on load component to set products', () => {
  render(<Produtos />, { initialState });

  expect(mockDispatchFn).toHaveBeenCalledTimes(1);
});
