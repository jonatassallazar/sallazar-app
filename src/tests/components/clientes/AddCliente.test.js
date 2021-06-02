import {
  render,
  fireEvent,
  screen,
  history,
  waitFor,
} from '../../utils/render';
import { AddCliente } from '../../../components';
import * as redux from 'react-redux';

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
  render(<AddCliente />);

  expect(screen.getByRole('heading')).toHaveTextContent('Novo Cliente');
});

it('should navigate back to clientes', () => {
  render(<AddCliente />);

  //Confirming the change on pathname below
  history.push('/clientes/add');

  fireEvent.click(screen.getByRole('link'));

  expect(history.location).toHaveProperty('pathname', '/clientes');
});

describe('should handle all submit actions', () => {
  history.push('/clientes/add');

  it('should set name on input', () => {
    render(<AddCliente history={history} />);

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
    render(<AddCliente history={history} />);

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
    render(<AddCliente history={history} />);

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

    await waitFor(() => expect(mockDispatchFn).toHaveBeenCalledTimes(1));

    expect(history.location.pathname).toBe('/clientes');
  });
});
