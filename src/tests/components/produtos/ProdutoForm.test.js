import { render, fireEvent, screen, waitFor } from '../../utils/render';
import userEvent from '@testing-library/user-event';
import { ProdutoForm } from '../../../components';
import moment from 'moment';

beforeEach(() => {
  jest.useFakeTimers('modern');
  jest.setSystemTime(new Date(0));
});

afterAll(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

it('should have a status select field', () => {
  render(<ProdutoForm />);

  expect(screen.getByTestId('status')).toBeInTheDocument();
});

it('should have a name field', () => {
  render(<ProdutoForm />);

  expect(screen.getByTestId('nome-produto')).toBeInTheDocument();
});

it('should have a unidade field', () => {
  render(<ProdutoForm />);

  expect(screen.getByTestId('unidade')).toBeInTheDocument();
});

it('should have an peso field', () => {
  render(<ProdutoForm />);

  expect(screen.getByTestId('peso')).toBeInTheDocument();
});

it('should have a preco-custo field', () => {
  render(<ProdutoForm />);

  expect(screen.getByTestId('preco-custo')).toBeInTheDocument();
});

it('should have an valor-venda field', () => {
  render(<ProdutoForm />);

  expect(screen.getByTestId('valor-venda')).toBeInTheDocument();
});

it('should have an fornecedor field', () => {
  render(<ProdutoForm />);

  expect(screen.getByTestId('peso')).toBeInTheDocument();
});

it('should have a save button', () => {
  render(<ProdutoForm />);

  expect(screen.getByRole('button', { name: 'Salvar' })).toBeInTheDocument();
});

it('should have a delete button only with props', () => {
  render(<ProdutoForm />);

  expect(
    screen.queryByRole('button', { name: 'Remover' })
  ).not.toBeInTheDocument();

  render(<ProdutoForm handleDelete={jest.fn()} />);

  expect(screen.queryByRole('button', { name: 'Remover' })).toBeInTheDocument();
});

it('should show an error on saving without a name', () => {
  const onSubmit = jest.fn();

  render(<ProdutoForm onSubmit={onSubmit} />);

  fireEvent.click(screen.getByRole('button', { name: 'Salvar' }));

  expect(screen.getByText('Digite um nome para o Produto')).toBeInTheDocument();
  expect(onSubmit).not.toHaveBeenCalled();
});

it('should call onSubmit when saving with a name', () => {
  const onSubmit = jest.fn();

  render(<ProdutoForm onSubmit={onSubmit} />);

  fireEvent.change(
    screen.getByTestId('nome-produto').childNodes[1].childNodes[0],
    {
      target: {
        value: 'bag',
      },
    }
  );

  fireEvent.click(screen.getByRole('button', { name: 'Salvar' }));

  expect(
    screen.queryByText('Digite um nome para o Produto')
  ).not.toBeInTheDocument();
  expect(onSubmit).toHaveBeenCalled();
});

it('should call onSubmit with full data object', async () => {
  const onSubmit = jest.fn();

  render(<ProdutoForm onSubmit={onSubmit} />);

  fireEvent.change(screen.getByTestId('status').childNodes[1], {
    target: {
      value: 'Inativo',
    },
  });

  fireEvent.change(
    screen.getByTestId('nome-produto').childNodes[1].childNodes[0],
    {
      target: {
        value: 'bag',
      },
    }
  );

  fireEvent.change(screen.getByTestId('unidade').childNodes[1].childNodes[0], {
    target: {
      value: 'un',
    },
  });

  fireEvent.change(screen.getByTestId('peso').childNodes[1].childNodes[1], {
    target: {
      value: 1000,
    },
  });

  fireEvent.change(
    screen.getByTestId('fornecedor').childNodes[1].childNodes[0],
    {
      target: {
        value: 'Jorge',
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
        value: 2000,
      },
    }
  );

  fireEvent.click(screen.getByRole('button', { name: 'Salvar' }));

  expect(
    screen.queryByText('Digite um nome para o Produto')
  ).not.toBeInTheDocument();
  expect(onSubmit).toHaveBeenCalledWith({
    nome: 'bag',
    peso: 1000,
    unidade: 'un',
    status: 'ativo',
    valorCusto: 1000,
    valorVenda: 2000,
    fornecedor: 'Jorge',
    createdAt: 0,
  });
});

it('should populate all fields with props', () => {
  const onSubmit = jest.fn();

  const productObject = {
    nome: 'bag',
    peso: 1000,
    unidade: 'un',
    status: 'ativo',
    valorCusto: 1000,
    valorVenda: 2000,
    fornecedor: 'Jorge',
    createdAt: 0,
  };

  render(<ProdutoForm onSubmit={onSubmit} produto={productObject} />);

  fireEvent.click(screen.getByRole('button', { name: 'Salvar' }));

  expect(
    screen.queryByText('Digite um nome para o Produto')
  ).not.toBeInTheDocument();
  expect(onSubmit).toHaveBeenCalledWith(productObject);
});

it('should dispatch delete function on click', () => {
  const handleDelete = jest.fn();

  render(<ProdutoForm handleDelete={handleDelete} />);

  fireEvent.click(screen.getByRole('button', { name: 'Remover' }));

  expect(handleDelete).toHaveBeenCalled();
});

it('should NOT have a delete button without handleDelete prop', () => {
  render(<ProdutoForm />);

  expect(
    screen.queryByRole('button', { name: 'Remover' })
  ).not.toBeInTheDocument();
});
