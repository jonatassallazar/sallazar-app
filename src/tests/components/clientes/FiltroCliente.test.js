import { render, fireEvent, screen } from '../../utils/render';
import { FiltroCliente } from '../../../components';
import * as redux from 'react-redux';

const initialState = {
  filtrosClientes: {
    nome: '',
    email: '',
    telefone: '',
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
  render(<FiltroCliente />, { initialState });

  expect(screen.getByText('Filtrar')).toBeInTheDocument();
});

it('should dispatch change for field name', () => {
  render(<FiltroCliente />, { initialState });

  fireEvent.change(
    screen.getByTestId('filtro-nome').childNodes[1].childNodes[0],
    {
      target: {
        value: 'Charlie',
      },
    }
  );

  expect(mockDispatchFn).toHaveBeenCalled();
  expect(mockDispatchFn).toHaveBeenCalledWith({
    nome: 'Charlie',
    type: 'SET_NOME_FILTER',
  });
});

it('should dispatch change for field email', () => {
  render(<FiltroCliente />, { initialState });

  fireEvent.change(
    screen.getByTestId('filtro-email').childNodes[1].childNodes[0],
    {
      target: {
        value: 'charlie@gmail',
      },
    }
  );

  expect(mockDispatchFn).toHaveBeenCalled();
  expect(mockDispatchFn).toHaveBeenCalledWith({
    email: 'charlie@gmail',
    type: 'SET_EMAIL_FILTER',
  });
});

it('should dispatch change for field telefone', () => {
  render(<FiltroCliente />, { initialState });

  fireEvent.change(
    screen.getByTestId('filtro-tel').childNodes[1].childNodes[0],
    {
      target: {
        value: '1982754',
      },
    }
  );

  expect(mockDispatchFn).toHaveBeenCalled();
  expect(mockDispatchFn).toHaveBeenCalledWith({
    telefone: '1982754',
    type: 'SET_TELEFONE_FILTER',
  });
});

it('should dispatch function to clear all fields', async () => {
  render(<FiltroCliente />, { initialState });

  fireEvent.click(screen.getByRole('button', { name: 'Limpar' }));

  expect(mockDispatchFn).toHaveBeenCalled();
  expect(mockDispatchFn).toHaveBeenCalledWith({ type: 'CLEAN_FILTER' });
});
