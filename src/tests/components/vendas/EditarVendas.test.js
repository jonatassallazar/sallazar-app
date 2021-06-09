import {
  render,
  fireEvent,
  screen,
  history,
  waitFor,
} from '../../utils/render';
import { EditarVendas } from '../../../components';
import * as redux from 'react-redux';
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
  render(<EditarVendas />);

  expect(screen.getByRole('heading')).toHaveTextContent('Editar Venda');
});

it('should navigate back to vendas', () => {
  //Confirming the change on pathname below
  history.push('/vendas/editar');

  render(<EditarVendas history={history} />);

  fireEvent.click(screen.getByRole('link'));

  expect(history.location).toHaveProperty('pathname', '/vendas');
});

it('should delete and navigate back to vendas', async () => {
  //Confirming the change on pathname below
  history.push('/vendas/editar');

  render(
    <EditarVendas match={{ params: { id: '123abc' } }} history={history} />,
    { initialState }
  );

  fireEvent.click(screen.getByRole('button', { name: 'Clique aqui para excluir' }));

  await waitFor(() => expect(mockDispatchFn).toHaveBeenCalledTimes(4));

  expect(history.location).toHaveProperty('pathname', '/vendas');
});

describe('testing base functions', () => {
  it('should dispatch startSetVendas on load', () => {
    render(<EditarVendas />);

    expect(mockDispatchFn).toHaveBeenCalled();
  });

  it('should find sale by id', () => {
    render(<EditarVendas match={{ params: { id: '123abc' } }} />, {
      initialState,
    });

    expect(screen.getByTestId('frete').childNodes[1].childNodes[1]).toHaveValue(
      '3,00'
    );
  });

  it('should NOT load form when has NO props', () => {
    render(<EditarVendas />);

    expect(screen.queryByTestId('numero-venda')).not.toBeInTheDocument();
  });

  it('should load form when has props', () => {
    render(<EditarVendas match={{ params: { id: '123abc' } }} />, {
      initialState,
    });

    expect(screen.getByTestId('numero-venda')).toBeInTheDocument();
  });
});

describe('should handle all submit actions', () => {
  history.push('/vendas/add');

  it('should send data to onSubmit on props', () => {
    render(
      <EditarVendas history={history} match={{ params: { id: '123abc' } }} />,
      {
        initialState,
      }
    );

    fireEvent.click(
      screen.getByRole('button', { name: 'Clique aqui para salvar' })
    );

    expect(mockDispatchFn).toHaveBeenCalled();
  });

  it('should navigate back to vendas path', async () => {
    render(
      <EditarVendas match={{ params: { id: '123abc' } }} history={history} />,
      {
        initialState,
      }
    );

    fireEvent.click(
      screen.getByRole('button', { name: 'Clique aqui para salvar' })
    );

    await waitFor(() => expect(mockDispatchFn).toHaveBeenCalledTimes(4));

    expect(history.location.pathname).toBe('/vendas');
  });
});
