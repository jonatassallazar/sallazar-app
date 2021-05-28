import clientesSelector from '../../selectors/clientes';
import clientes from '../fixtures/clientes';

it('should return all clients', () => {
  const result = clientesSelector(clientes, {
    nome: '',
    email: '',
    telefone: '',
  });

  expect(result).toEqual(clientes);
});

it('should filter by name', () => {
  const result = clientesSelector(clientes, {
    nome: 'Jr.',
    email: '',
    telefone: '',
  });

  expect(result).toEqual([clientes[0]]);
});

it('should filter by name - no results', () => {
  const result = clientesSelector(clientes, {
    nome: 'Jr.asddasdd',
    email: '',
    telefone: '',
  });

  expect(result).toEqual([]);
});

it('should filter by name in any case', () => {
  const result = clientesSelector(clientes, {
    nome: 'ChArLiE DELTA',
    email: '',
    telefone: '',
  });

  expect(result).toEqual([clientes[1]]);
});

it('should filter by name with special character', () => {
  const result = clientesSelector(clientes, {
    nome: 'Enél',
    email: '',
    telefone: '',
  });

  expect(result).toEqual([clientes[2]]);
});

it('should filter by email', () => {
  const result = clientesSelector(clientes, {
    nome: '',
    email: 'delta@gmail',
    telefone: '',
  });

  expect(result).toEqual([clientes[1]]);
});

it('should filter by email - no result', () => {
  const result = clientesSelector(clientes, {
    nome: '',
    email: 'delta@gmailasdasd',
    telefone: '',
  });

  expect(result).toEqual([]);
});

it('should filter by email in any case', () => {
  const result = clientesSelector(clientes, {
    nome: '',
    email: 'dELTa@gmaIL',
    telefone: '',
  });

  expect(result).toEqual([clientes[1]]);
});

it('should filter by nome and email', () => {
  const result = clientesSelector(clientes, {
    nome: 'Charlie',
    email: 'delta@gmail',
    telefone: '',
  });

  expect(result).toEqual([clientes[1]]);
});

it('should filter by nome and email - no result', () => {
  const result = clientesSelector(clientes, {
    nome: 'Charlieasd',
    email: 'delta@gmail',
    telefone: '',
  });

  expect(result).toEqual([]);
});

it('should filter by telefone', () => {
  const result = clientesSelector(clientes, {
    nome: '',
    email: '',
    telefone: '012535',
  });

  expect(result).toEqual([clientes[2]]);
});

it('should filter by telefone - no result', () => {
  const result = clientesSelector(clientes, {
    nome: '',
    email: '',
    telefone: '01253451415415414155',
  });

  expect(result).toEqual([]);
});

it('should filter by telefone and email', () => {
  const result = clientesSelector(clientes, {
    nome: '',
    email: 'delta@gmail',
    telefone: '119825454456',
  });

  expect(result).toEqual([clientes[1]]);
});

it('should filter by telefone and email - no result', () => {
  const result = clientesSelector(clientes, {
    nome: '',
    email: 'delta@gmail',
    telefone: '140541541',
  });

  expect(result).toEqual([]);
});

it('should filter by nome, email and telefone', () => {
  const result = clientesSelector(clientes, {
    nome: 'Charlie',
    email: 'delta@gmail',
    telefone: '119825454456',
  });

  expect(result).toEqual([clientes[1]]);
});

it('should filter by nome, email and telefone - no result', () => {
  const result = clientesSelector(clientes, {
    nome: 'Charlieads',
    email: 'delta@mail',
    telefone: '115454456',
  });

  expect(result).toEqual([]);
});