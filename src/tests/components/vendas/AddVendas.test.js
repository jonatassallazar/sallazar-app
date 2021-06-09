import {
  render,
  fireEvent,
  screen,
  history,
  waitFor,
} from '../../utils/render';
import { AddVendas } from '../../../components';
import * as redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import clientes from '../../fixtures/clientes';
import produtos from '../../fixtures/produtos';
import vendas from '../../fixtures/vendas';

const initialState = {
  clientes,
  produtos,
  vendas,
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

it('should have heading', () => {
  render(<AddVendas />);

  expect(screen.getByRole('heading')).toHaveTextContent('Nova Venda');
});

it('should navigate back to vendas', () => {
  render(<AddVendas />);

  //Confirming the change on pathname below
  history.push('/vendas/add');

  fireEvent.click(screen.getByRole('link'));

  expect(history.location).toHaveProperty('pathname', '/vendas');
});

describe('should handle all submit actions', () => {
  history.push('/vendas/add');

  it('should send data to onSubmit on props', () => {
    render(<AddVendas history={history} />, { initialState });

    userEvent.type(
      screen.getByTestId('data-venda').childNodes[1].childNodes[0],
      '01/01/1999'
    );

    fireEvent.change(
      screen.getByTestId('cliente').childNodes[0].childNodes[1].childNodes[0],
      {
        target: {
          value: clientes[0],
        },
      }
    );

    fireEvent.change(
      screen.getByTestId('produto').childNodes[0].childNodes[1].childNodes[0],
      {
        target: {
          value: produtos[0],
        },
      }
    );

    fireEvent.click(
      screen.getByRole('button', { name: 'Clique aqui para salvar' }),
      {
        target: {},
      }
    );

    expect(mockDispatchFn).toHaveBeenCalled();
  });

  it('should navigate back to vendas path', async () => {
    render(<AddVendas history={history} />, { initialState });

    userEvent.type(
      screen.getByTestId('data-venda').childNodes[1].childNodes[0],
      '01/01/1999'
    );

    fireEvent.change(
      screen.getByTestId('cliente').childNodes[0].childNodes[1].childNodes[0],
      {
        target: {
          value: clientes[0],
        },
      }
    );

    fireEvent.change(
      screen.getByTestId('produto').childNodes[0].childNodes[1].childNodes[0],
      {
        target: {
          value: produtos[0],
        },
      }
    );

    fireEvent.click(
      screen.getByRole('button', { name: 'Clique aqui para salvar' }),
      {
        target: {},
      }
    );

    await waitFor(() => expect(mockDispatchFn).toHaveBeenCalledTimes(3));

    expect(history.location.pathname).toBe('/vendas');
  });
});

it('should generate a valid number for the sale with previous sales', () => {
  render(<AddVendas history={history} />, { initialState });

  expect(
    screen.getByTestId('numero-venda').childNodes[1].childNodes[0]
  ).toHaveValue('00003');
});

it('should generate a valid number for the sale without previous sales', () => {
  render(<AddVendas history={history} />);

  expect(
    screen.getByTestId('numero-venda').childNodes[1].childNodes[0]
  ).toHaveValue('00000');
});
