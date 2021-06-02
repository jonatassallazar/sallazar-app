import {
  render,
  fireEvent,
  screen,
  history,
  waitFor,
} from '../../utils/render';
import { EditarCliente } from '../../../components';
import * as redux from 'react-redux';
import clientes from '../../fixtures/clientes';

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
  render(<EditarCliente />);

  expect(screen.getByRole('heading')).toHaveTextContent('Editar Cliente');
});

it('should navigate back to clientes', () => {
  //Confirming the change on pathname below
  history.push('/clientes/editar');

  render(<EditarCliente history={history} />);

  fireEvent.click(screen.getByRole('link'));

  expect(history.location).toHaveProperty('pathname', '/clientes');
});

describe('testing base functions', () => {
  it('should dispatch startSetClientes on load', () => {
    render(<EditarCliente />);

    expect(mockDispatchFn).toHaveBeenCalled();
  });

  it('should find client by id', () => {
    render(<EditarCliente match={{ params: { id: '123abc' } }} />, {
      initialState: { clientes: clientes },
    });

    expect(
      screen.getByTestId('nome-completo').childNodes[1].childNodes[0]
    ).toHaveValue('Test Jr.');
  });

  it('should NOT load form when has NO props', () => {
    render(<EditarCliente />);

    expect(screen.queryByTestId('nome-completo')).toBeFalsy();
  });

  it('should load form when has props', () => {
    render(<EditarCliente match={{ params: { id: '123abc' } }} />, {
      initialState: { clientes: clientes },
    });

    expect(screen.getByTestId('nome-completo')).toBeTruthy();
  });
});

describe('should handle all submit actions', () => {
  history.push('/clientes/add');

  it('should set name on input', () => {
    render(<EditarCliente match={{ params: { id: '123abc' } }} />, {
      initialState: { clientes: clientes },
    });

    fireEvent.change(
      screen.getByTestId('nome-completo').childNodes[1].childNodes[0],
      {
        target: {
          value: 'Delta Major',
        },
      }
    );

    expect(
      screen.getByTestId('nome-completo').childNodes[1].childNodes[0]
    ).toHaveValue('Delta Major');
  });

  it('should send data to onSubmit on props', () => {
    render(<EditarCliente history={history} match={{ params: { id: '123abc' } }} />, {
      initialState: { clientes: clientes },
    });

    fireEvent.change(
      screen.getByTestId('nome-completo').childNodes[1].childNodes[0],
      {
        target: {
          value: 'Delta Major',
        },
      }
    );

    fireEvent.click(screen.getByRole('button', { name: 'Salvar' }), {
      target: {},
    });

    expect(mockDispatchFn).toHaveBeenCalled();
  });

  it('should navigate back to clientes path', async () => {
    render(
      <EditarCliente match={{ params: { id: '123abc' } }} history={history} />,
      {
        initialState: { clientes: clientes },
      }
    );

    fireEvent.change(
      screen.getByTestId('nome-completo').childNodes[1].childNodes[0],
      {
        target: {
          value: 'Delta Major',
        },
      }
    );

    fireEvent.click(screen.getByRole('button', { name: 'Salvar' }), {
      target: {},
    });

    await waitFor(() => expect(mockDispatchFn).toHaveBeenCalledTimes(2));

    expect(history.location.pathname).toBe('/clientes');
  });
});
