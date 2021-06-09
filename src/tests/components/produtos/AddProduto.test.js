import {
  render,
  fireEvent,
  screen,
  history,
  waitFor,
} from '../../utils/render';
import { AddProduto } from '../../../components';
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
  render(<AddProduto />);

  expect(screen.getByRole('heading')).toHaveTextContent('Novo Produto');
});

it('should navigate back to produtos', () => {
  render(<AddProduto />);

  //Confirming the change on pathname below
  history.push('/produtos/add');

  fireEvent.click(screen.getByRole('link'));

  expect(history.location).toHaveProperty('pathname', '/produtos');
});

describe('should handle all submit actions', () => {
  history.push('/produtos/add');

  it('should set product name on input', () => {
    render(<AddProduto history={history} />);

    fireEvent.change(
      screen.getByTestId('nome-produto').childNodes[1].childNodes[0],
      {
        target: {
          value: 'Bag',
        },
      }
    );

    expect(
      screen.getByTestId('nome-produto').childNodes[1].childNodes[0]
    ).toHaveValue('Bag');
  });

  it('should send data to onSubmit on props', () => {
    render(<AddProduto history={history} />);

    fireEvent.change(
      screen.getByTestId('nome-produto').childNodes[1].childNodes[0],
      {
        target: {
          value: 'bag',
        },
      }
    );

    fireEvent.change(
      screen.getByTestId('preco-custo').childNodes[1].childNodes[1],
      {
        target: {
          value: 1000,
        },
      }
    );

    fireEvent.change(
      screen.getByTestId('valor-venda').childNodes[1].childNodes[1],
      {
        target: {
          value: 2500,
        },
      }
    );

    fireEvent.click(screen.getByTestId('save-button-produto'));

    expect(mockDispatchFn).toHaveBeenCalled();
  });

  it('should navigate back to produtos path', async () => {
    render(<AddProduto history={history} />);

    fireEvent.change(
      screen.getByTestId('nome-produto').childNodes[1].childNodes[0],
      {
        target: {
          value: 'bag',
        },
      }
    );

    fireEvent.change(
      screen.getByTestId('preco-custo').childNodes[1].childNodes[1],
      {
        target: {
          value: 1000,
        },
      }
    );

    fireEvent.change(
      screen.getByTestId('valor-venda').childNodes[1].childNodes[1],
      {
        target: {
          value: 2500,
        },
      }
    );

    fireEvent.click(screen.getByTestId('save-button-produto'));

    await waitFor(() => expect(mockDispatchFn).toHaveBeenCalledTimes(1));

    expect(history.location.pathname).toBe('/produtos');
  });
});
