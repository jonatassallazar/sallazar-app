import clientesReducer from '../../reducers/clientes';
import clientes from '../fixtures/clientes';

it('should add client and return new object', () => {
  const result = clientesReducer(undefined, {
    type: 'ADD_CLIENTE',
    cliente: clientes[0],
  });

  expect(result).toEqual([clientes[0]]);
});

it('should add new client and return object with previous state', () => {
  const result = clientesReducer([clientes[0]], {
    type: 'ADD_CLIENTE',
    cliente: clientes[1],
  });

  expect(result).toEqual([clientes[0], clientes[1]]);
});

it('should edit client and return new array', () => {
  const result = clientesReducer(clientes, {
    type: 'EDITAR_CLIENTE',
    id: '456def',
    updates: {
      nome: 'Omega Prime',
    },
  });

  expect(result).toEqual([
    clientes[0],
    { ...clientes[1], nome: 'Omega Prime' },
    clientes[2],
  ]);
});

it('should not edit client and return state unchanged', () => {
  const result = clientesReducer(clientes, {
    type: 'EDITAR_CLIENTE',
    id: '456sdef',
    updates: {
      nome: 'Omega Prime',
    },
  });

  expect(result).toEqual(clientes);
});

it('should remove client and return new array', () => {
  const result = clientesReducer(clientes, {
    type: 'REMOVER_CLIENTE',
    cliente: { id: '456def' },
  });

  expect(result).toEqual([clientes[0], clientes[2]]);
});

it('should not remove client and return state unchanged', () => {
  const result = clientesReducer(clientes, {
    type: 'REMOVER_CLIENTE',
    cliente: { id: '456asddef' },
  });

  expect(result).toEqual(clientes);
});

it('should set clients', () => {
  const result = clientesReducer(undefined, {
    type: 'SET_CLIENTES',
    clientes,
  });

  expect(result).toEqual(clientes);
});

it('should not set clients', () => {
  const result = clientesReducer(undefined, {
    type: 'SET_CLIENTES',
  });

  expect(result).toEqual(undefined);
});

it('should return empty array', () => {
  const result = clientesReducer(undefined, {
    type: 'ANYTHING',
  });

  expect(result).toEqual([]);
});

it('should return previous state', () => {
  const result = clientesReducer(clientes, {
    type: 'ANYTHING',
  });

  expect(result).toEqual(clientes);
});
