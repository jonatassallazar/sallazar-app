import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
  waitFor,
} from '../../utils/render';
import { Dashboard } from '../../../components';
import * as redux from 'react-redux';
import vendas from '../../fixtures/vendas';

const initialState = {
  vendas,
  auth: {
    displayName: 'Beta',
  },
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

it('should have a welcome message with name', () => {
  render(<Dashboard />, { initialState });
  expect(screen.getByText(/Seja Bem Vindo/)).toBeInTheDocument();
  expect(screen.getByText(/Beta/)).toBeInTheDocument();
});

it('should have a title', () => {
  render(<Dashboard />);
  expect(screen.getByText('Dashboard')).toBeInTheDocument();
});

it('should have a sales summary', () => {
  render(<Dashboard />);
  expect(screen.getByText('Faturamento Mensal')).toBeInTheDocument();
});

it('should have last month sum sales', () => {
  render(<Dashboard />, { initialState });
  expect(screen.getByText('Mês Anterior')).toBeInTheDocument();
  expect(screen.getByTestId('last-month-sales-value')).toHaveTextContent('R$ 60,00');
});

it('should have last month 0 value', () => {
  render(<Dashboard />, { initialState: { vendas: [] } });
  expect(screen.getByText('Mês Anterior')).toBeInTheDocument();
  expect(screen.getByTestId('last-month-sales-value')).toHaveTextContent('R$ 0,00');
});

it('should have this month sum sales', () => {
  render(<Dashboard />, { initialState });
  expect(screen.getByText('Mês Anterior')).toBeInTheDocument();
  expect(screen.getByTestId('this-month-sales-value')).toHaveTextContent('R$ 100,00');
});

it('should have this month 0 value', () => {
  render(<Dashboard />, { initialState: { vendas: [] } });
  expect(screen.getByText('Mês Anterior')).toBeInTheDocument();
  expect(screen.getByTestId('this-month-sales-value')).toHaveTextContent('R$ 0,00');
});

it('should have a calendar section', () => {
  render(<Dashboard />);
  expect(screen.getByText('Calendário')).toBeInTheDocument();
});

it('should dispatch on load', () => {
  render(<Dashboard />);
  expect(mockDispatchFn).toHaveBeenCalled();
});

it('should have title for Gráfico de Vendas', () => {
  render(<Dashboard />, { initialState });
  expect(screen.getByText(/Gráfico de Vendas/)).toBeInTheDocument();
});

it('should have a button to open modal', () => {
  render(<Dashboard />, { initialState });
  expect(screen.getByTestId('data-range-button-display')).toBeInTheDocument();
});

it('should have a calendar', () => {
  render(<Dashboard />, { initialState });

  expect(screen.queryByTestId('modal-calendar')).not.toBeInTheDocument();
  fireEvent.click(screen.getByTestId('data-range-button-display'));
  expect(screen.getByTestId('modal-calendar')).toBeInTheDocument();
});
