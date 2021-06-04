import { render, fireEvent, screen } from '../../utils/render';
import userEvent from '@testing-library/user-event';
import { ClienteForm } from '../../../components';
import moment from 'moment';

beforeAll(() => {
  jest.useFakeTimers('modern');
  jest.setSystemTime(new Date(0));
});

afterAll(() => {
  jest.useRealTimers();
});

it('should have a status select field', () => {
  render(<ClienteForm />);

  expect(screen.getByTestId('status')).toBeTruthy();
});

it('should have a name field', () => {
  render(<ClienteForm />);

  expect(screen.getByTestId('nome-completo')).toBeTruthy();
});

it('should have a telefone field', () => {
  render(<ClienteForm />);

  expect(screen.getByTestId('telefone')).toBeTruthy();
});

it('should have an email field', () => {
  render(<ClienteForm />);

  expect(screen.getByTestId('email')).toBeTruthy();
});

it('should have a sexo field', () => {
  render(<ClienteForm />);

  expect(screen.getByTestId('email')).toBeTruthy();
});

it('should have a tags selector field', () => {
  render(<ClienteForm />);

  expect(screen.getByTestId('email')).toBeTruthy();
});

it('should have a save button', () => {
  render(<ClienteForm />);

  expect(screen.getByRole('button', { name: 'Salvar' })).toBeTruthy();
});

it('should have a delete button only with props', () => {
  render(<ClienteForm />);

  expect(screen.queryByRole('button', { name: 'Remover' })).not.toBeTruthy();

  render(<ClienteForm handleDelete={true} />);

  expect(screen.queryByRole('button', { name: 'Remover' })).toBeTruthy();
});

it('should show an error on saving without a name', () => {
  const onSubmit = jest.fn();

  render(<ClienteForm onSubmit={onSubmit} />);

  fireEvent.click(screen.getByRole('button', { name: 'Salvar' }));

  expect(screen.getByText('Digite um nome para o cliente')).toBeTruthy();
  expect(onSubmit).not.toHaveBeenCalled();
});

it('should call onSubmit when saving with a name', () => {
  const onSubmit = jest.fn();

  render(<ClienteForm onSubmit={onSubmit} />);

  fireEvent.change(
    screen.getByTestId('nome-completo').childNodes[1].childNodes[0],
    {
      target: {
        value: 'Charlie',
      },
    }
  );

  fireEvent.click(screen.getByRole('button', { name: 'Salvar' }));

  expect(screen.queryByText('Digite um nome para o cliente')).not.toBeTruthy();
  expect(onSubmit).toHaveBeenCalled();
});

it('should call onSubmit with full data object', () => {
  const onSubmit = jest.fn();

  render(<ClienteForm onSubmit={onSubmit} />);

  fireEvent.change(
    screen.getByTestId('nome-completo').childNodes[1].childNodes[0],
    {
      target: {
        value: 'Charlie',
      },
    }
  );

  fireEvent.change(screen.getByTestId('telefone').childNodes[1].childNodes[0], {
    target: {
      value: '1982154',
    },
  });

  fireEvent.change(screen.getByTestId('email').childNodes[1].childNodes[0], {
    target: {
      value: 'charlie@test',
    },
  });

  userEvent.type(
    screen.getByTestId('data-nascimento').childNodes[1].childNodes[0], '01121995'
  );

  fireEvent.change(screen.getByTestId('sexo').childNodes[1], {
    target: {
      value: 'Masculino',
    },
  });

  fireEvent.click(screen.getByRole('button', { name: 'Salvar' }));

  expect(screen.queryByText('Digite um nome para o cliente')).not.toBeTruthy();
  expect(onSubmit).toHaveBeenCalledWith({
    nome: 'Charlie',
    email: 'charlie@test',
    telefone: '1982154',
    dataDeNascimento: moment("1995-12-01").valueOf(),
    status: 'Ativo',
    genero: 'Masculino',
    selectedTags: [],
    createdAt: 0,
    enderecoCompleto: {
      CEP: '',
      endereco: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: '',
    },
  });
});
