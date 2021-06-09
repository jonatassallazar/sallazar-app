import { render, fireEvent, screen, waitFor } from '../../utils/render';
import { FiltroVenda } from '../../../components';
import * as redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import moment from 'moment';

const initialState = {
  filtrosVendas: {
    nome: '',
    status: 'todos',
    dataVendaInicial: moment(0).subtract(90, 'days').valueOf(),
    dataVendaFinal: moment(0).valueOf(),
  },
};

const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
let mockDispatchFn = jest.fn((fn) => fn);

beforeEach(() => {
  mockDispatchFn = jest.fn((fn) => fn);
  useDispatchSpy.mockReturnValue(mockDispatchFn);
});

afterEach(() => {
  useDispatchSpy.mockClear();
});

it('should have block title', () => {
  render(<FiltroVenda />, { initialState });

  expect(screen.getByText('Filtrar')).toBeInTheDocument();
});

it('should dispatch change for field client', () => {
  render(<FiltroVenda />, { initialState });

  fireEvent.change(
    screen.getByTestId('filtro-cliente').childNodes[1].childNodes[0],
    {
      target: {
        value: 'Charlie',
      },
    }
  );

  expect(mockDispatchFn).toHaveBeenCalled();
  expect(mockDispatchFn).toHaveBeenCalledWith({
    cliente: 'Charlie',
    type: 'SET_CLIENTE_FILTER',
  });
});

it('should dispatch change for field status', () => {
  render(<FiltroVenda />, { initialState });

  fireEvent.change(screen.getByTestId('filtro-status').childNodes[1], {
    target: {
      value: 'em andamento',
    },
  });

  expect(mockDispatchFn).toHaveBeenCalled();
  expect(mockDispatchFn).toHaveBeenCalledWith({
    status: 'em andamento',
    type: 'SET_STATUS_FILTER',
  });
});

it('should dispatch change for field start date', () => {
  render(<FiltroVenda />, { initialState });
  const campoDataInicial = screen.getByTestId('filtro-data-inicial')
    .childNodes[1].childNodes[0];

  userEvent.clear(campoDataInicial);
  userEvent.type(campoDataInicial, '01121995');

  expect(mockDispatchFn).toHaveBeenCalled();
  expect(mockDispatchFn).toHaveBeenCalledWith({
    dataVendaInicial: 817783200000,
    type: 'SET_DATAVENDA_INICIAL_FILTER',
  });
});

it('should dispatch change for field end date', () => {
  render(<FiltroVenda />, { initialState });
  const campoDataFinal =
    screen.getByTestId('filtro-data-final').childNodes[1].childNodes[0];

  userEvent.clear(campoDataFinal);
  userEvent.type(campoDataFinal, '01121995');

  expect(mockDispatchFn).toHaveBeenCalled();
  expect(mockDispatchFn).toHaveBeenCalledWith({
    dataVendaFinal: 817783200000,
    type: 'SET_DATAVENDA_FINAL_FILTER',
  });
});
it('should dispatch function to clear all fields', () => {
  render(<FiltroVenda />, { initialState });

  fireEvent.click(screen.getByRole('button', { name: 'Limpar' }));

  expect(mockDispatchFn).toHaveBeenCalled();
  expect(mockDispatchFn).toHaveBeenCalledWith({ type: 'CLEAN_FILTER' });
});
