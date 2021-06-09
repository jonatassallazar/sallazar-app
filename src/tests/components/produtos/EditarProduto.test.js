import {
  render,
  fireEvent,
  screen,
  history,
  waitFor,
} from '../../utils/render';
import { EditarProduto } from '../../../components';
import * as redux from 'react-redux';
import produtos from '../../fixtures/produtos';

const initialState = { produtos };

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
  render(<EditarProduto />);

  expect(screen.getByRole('heading')).toHaveTextContent('Editar Produto');
});

it('should navigate back to produtos', () => {
  //Confirming the change on pathname below
  history.push('/produtos/editar');

  render(<EditarProduto history={history} />);

  fireEvent.click(screen.getByRole('link'));

  expect(history.location).toHaveProperty('pathname', '/produtos');
});

it('should delete and navigate back to vendas', async () => {
  //Confirming the change on pathname below
  history.push('/produtos/editar');

  render(
    <EditarProduto match={{ params: { id: '123abc' } }} history={history} />,
    { initialState }
  );

  fireEvent.click(
    screen.getByRole('button', { name: 'Clique aqui para excluir' })
  );

  await waitFor(() => expect(mockDispatchFn).toHaveBeenCalledTimes(2));

  expect(history.location).toHaveProperty('pathname', '/produtos');
});

describe('testing base functions', () => {
  it('should dispatch startSetProdutos on load', () => {
    render(<EditarProduto />);

    expect(mockDispatchFn).toHaveBeenCalled();
  });

  it('should find product by id', () => {
    render(<EditarProduto match={{ params: { id: '123abc' } }} />, {
      initialState,
    });

    expect(
      screen.getByTestId('nome-produto').childNodes[1].childNodes[0]
    ).toHaveValue('Purse');
  });

  it('should NOT load form when has NO props', () => {
    render(<EditarProduto />);

    expect(screen.queryByTestId('nome-produto')).toBeFalsy();
  });

  it('should load form when has props', () => {
    render(<EditarProduto match={{ params: { id: '123abc' } }} />, {
      initialState,
    });

    expect(screen.getByTestId('nome-produto')).toBeInTheDocument();
  });
});

describe('should handle all submit actions', () => {
  history.push('/produtos/add');

  it('should send data to onSubmit on props', () => {
    render(
      <EditarProduto history={history} match={{ params: { id: '123abc' } }} />,
      { initialState }
    );

    fireEvent.click(
      screen.getByRole('button', { name: 'Clique aqui para salvar' })
    );

    expect(mockDispatchFn).toHaveBeenCalled();
  });

  it('should navigate back to produtos path', async () => {
    render(
      <EditarProduto match={{ params: { id: '123abc' } }} history={history} />,
      { initialState }
    );

    fireEvent.click(
      screen.getByRole('button', { name: 'Clique aqui para salvar' })
    );

    await waitFor(() => expect(mockDispatchFn).toHaveBeenCalledTimes(2));

    expect(history.location.pathname).toBe('/produtos');
  });
});
