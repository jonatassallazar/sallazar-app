import filtrosClientesReducer from '../../reducers/filtrosClientes';

it('should set nome on filter', () => {
  const result = filtrosClientesReducer(undefined, {
    type: 'SET_NOME_FILTER',
    nome: 'Lamber',
  });
  expect(result).toEqual({
    nome: 'Lamber',
    email: '',
    telefone: '',
  });
});

it('should set email on filter', () => {
  const result = filtrosClientesReducer(undefined, {
    type: 'SET_EMAIL_FILTER',
    email: 'test@',
  });
  expect(result).toEqual({
    nome: '',
    email: 'test@',
    telefone: '',
  });
});

it('should set telefone on filter', () => {
  const result = filtrosClientesReducer(undefined, {
    type: 'SET_TELEFONE_FILTER',
    telefone: '15229',
  });
  expect(result).toEqual({
    nome: '',
    email: '',
    telefone: '15229',
  });
});

it('should clean filters', () => {
  const result = filtrosClientesReducer(undefined, {
    type: 'CLEAN_FILTER',
  });
  expect(result).toEqual({
    nome: '',
    email: '',
    telefone: '',
  });
});
