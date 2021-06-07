import { render, fireEvent, screen, waitFor } from '../../utils/render';
import userEvent from '@testing-library/user-event';
import { ClienteForm } from '../../../components';
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
  render(<ClienteForm />);

  expect(screen.getByTestId('status')).toBeInTheDocument();
});

it('should have a name field', () => {
  render(<ClienteForm />);

  expect(screen.getByTestId('nome-completo')).toBeInTheDocument();
});

it('should have a telefone field', () => {
  render(<ClienteForm />);

  expect(screen.getByTestId('telefone')).toBeInTheDocument();
});

it('should have an email field', () => {
  render(<ClienteForm />);

  expect(screen.getByTestId('email')).toBeInTheDocument();
});

it('should have a sexo field', () => {
  render(<ClienteForm />);

  expect(screen.getByTestId('sexo')).toBeInTheDocument();
});

it('should have a tags selector field', () => {
  render(<ClienteForm />);

  expect(screen.getByTestId('tags')).toBeInTheDocument();
});

it('should have a save button', () => {
  render(<ClienteForm />);

  expect(screen.getByRole('button', { name: 'Salvar' })).toBeInTheDocument();
});

it('should have a delete button only with props', () => {
  render(<ClienteForm />);

  expect(screen.queryByRole('button', { name: 'Remover' })).not.toBeInTheDocument();

  render(<ClienteForm handleDelete={jest.fn()} />);

  expect(screen.queryByRole('button', { name: 'Remover' })).toBeInTheDocument();
});

it('should show an error on saving without a name', () => {
  const onSubmit = jest.fn();

  render(<ClienteForm onSubmit={onSubmit} />);

  fireEvent.click(screen.getByRole('button', { name: 'Salvar' }));

  expect(screen.getByText('Digite um nome para o cliente')).toBeInTheDocument();
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

  expect(screen.queryByText('Digite um nome para o cliente')).not.toBeInTheDocument();
  expect(onSubmit).toHaveBeenCalled();
});

it('should call onSubmit with full data object', async () => {
  const onSubmit = jest.fn();

  render(<ClienteForm onSubmit={onSubmit} />);

  fireEvent.change(
    screen.getByTestId('cep-field').childNodes[1].childNodes[0],
    { target: { value: '12345678' } }
  );

  await waitFor(() => {
    expect(
      screen.getByTestId('endereco').childNodes[1].childNodes[0]
    ).toHaveValue('street ok');
  });

  fireEvent.change(screen.getByTestId('status').childNodes[1], {
    target: {
      value: 'Inativo',
    },
  });

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
    screen.getByTestId('data-nascimento').childNodes[1].childNodes[0],
    '01121995'
  );

  fireEvent.change(screen.getByTestId('sexo').childNodes[1], {
    target: {
      value: 'Masculino',
    },
  });

  userEvent.type(
    screen.getByTestId('numero').childNodes[1].childNodes[0],
    '12'
  );

  userEvent.type(
    screen.getByTestId('complemento').childNodes[1].childNodes[0],
    'none'
  );

  fireEvent.click(screen.getByRole('button', { name: 'Salvar' }));

  expect(screen.queryByText('Digite um nome para o cliente')).not.toBeInTheDocument();
  expect(onSubmit).toHaveBeenCalledWith({
    nome: 'Charlie',
    email: 'charlie@test',
    telefone: '1982154',
    dataDeNascimento: moment('1995-12-01').valueOf(),
    status: 'Inativo',
    genero: 'Masculino',
    selectedTags: [],
    createdAt: 0,
    enderecoCompleto: {
      CEP: '12345678',
      endereco: 'street ok',
      numero: '12',
      complemento: 'none',
      bairro: 'neighbour',
      cidade: 'Atlanta',
      estado: 'Nevada',
    },
  });
});

it('should populate all fields with props', () => {
  const onSubmit = jest.fn();

  const clientObject = {
    nome: 'Charlie',
    email: 'charlie@test',
    telefone: '1982154',
    dataDeNascimento: moment('1995-12-01').valueOf(),
    status: 'Ativo',
    genero: 'Masculino',
    selectedTags: [],
    createdAt: 0,
    enderecoCompleto: {
      CEP: '12345678',
      endereco: 'street ok',
      numero: '12',
      complemento: 'none',
      bairro: 'neighbour',
      cidade: 'Atlanta',
      estado: 'Nevada',
    },
  };

  render(<ClienteForm onSubmit={onSubmit} cliente={clientObject} />);

  fireEvent.click(screen.getByRole('button', { name: 'Salvar' }));

  expect(screen.queryByText('Digite um nome para o cliente')).not.toBeInTheDocument();
  expect(onSubmit).toHaveBeenCalledWith(clientObject);
});

it('should dispatch delete function on click', () => {
  const handleDelete = jest.fn();

  render(<ClienteForm handleDelete={handleDelete} />);

  fireEvent.click(screen.getByRole('button', { name: 'Remover' }));

  expect(handleDelete).toHaveBeenCalled();
});

it('should NOT have a delete button without handleDelete prop', () => {
  render(<ClienteForm />);

  expect(
    screen.queryByRole('button', { name: 'Remover' })
  ).not.toBeInTheDocument();
});
