import { render, fireEvent, screen } from '../../utils/render';
import { FiltroProduto } from '../../../components';
import * as redux from 'react-redux';

const initialState = {
  filtrosProdutos: {
    nome: '',
    fornecedor: '',
    status: '',
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
  render(<FiltroProduto />, { initialState });

  expect(screen.getByText('Filtrar')).toBeInTheDocument();
});

it('should dispatch change for field name', () => {
  render(<FiltroProduto />, { initialState });

  fireEvent.change(
    screen.getByTestId('filtro-nome').childNodes[1].childNodes[0],
    {
      target: {
        value: 'purse',
      },
    }
  );

  expect(mockDispatchFn).toHaveBeenCalled();
  expect(mockDispatchFn).toHaveBeenCalledWith({
    nome: 'purse',
    type: 'SET_NOME_FILTER',
  });
});

it('should dispatch change for field status', () => {
  render(<FiltroProduto />, { initialState });

  fireEvent.change(screen.getByTestId('filtro-status').childNodes[1], {
    target: {
      value: 'ativo',
    },
  });

  expect(mockDispatchFn).toHaveBeenCalled();
  expect(mockDispatchFn).toHaveBeenCalledWith({
    status: 'ativo',
    type: 'SET_STATUS_FILTER',
  });
});

it('should dispatch change for field fornecedor', () => {
  render(<FiltroProduto />, { initialState });

  fireEvent.change(
    screen.getByTestId('filtro-fornecedor').childNodes[1].childNodes[0],
    {
      target: {
        value: 'Jorge',
      },
    }
  );

  expect(mockDispatchFn).toHaveBeenCalled();
  expect(mockDispatchFn).toHaveBeenCalledWith({
    fornecedor: 'Jorge',
    type: 'SET_FORNECEDOR_FILTER',
  });
});

it('should dispatch function to clear all fields', async () => {
  render(<FiltroProduto />, { initialState });

  fireEvent.click(screen.getByRole('button', { name: 'Limpar' }));

  expect(mockDispatchFn).toHaveBeenCalled();
  expect(mockDispatchFn).toHaveBeenCalledWith({ type: 'CLEAN_FILTER' });
});
