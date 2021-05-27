import produtosReducer from '../../reducers/produtos';
import produtos from '../fixtures/produtos';

it('should add product and return new object', () => {
  const result = produtosReducer(undefined, {
    type: 'ADD_PRODUTO',
    produto: produtos[0],
  });

  expect(result).toEqual([produtos[0]]);
});

it('should add new product and return object with previous state', () => {
  const result = produtosReducer([produtos[0]], {
    type: 'ADD_PRODUTO',
    produto: produtos[1],
  });

  expect(result).toEqual([produtos[0], produtos[1]]);
});

it('should edit product and return new array', () => {
  const result = produtosReducer(produtos, {
    type: 'EDITAR_PRODUTO',
    id: '456def',
    updates: {
      nome: 'Omega Prime',
    },
  });

  expect(result).toEqual([
    produtos[0],
    { ...produtos[1], nome: 'Omega Prime' },
    produtos[2],
  ]);
});

it('should not edit product and return state unchanged', () => {
  const result = produtosReducer(produtos, {
    type: 'EDITAR_PRODUTO',
    id: '456sdef',
    updates: {
      nome: 'Omega Prime',
    },
  });

  expect(result).toEqual(produtos);
});

it('should remove product and return new array', () => {
  const result = produtosReducer(produtos, {
    type: 'REMOVER_PRODUTO',
    produto: { id: '456def' },
  });

  expect(result).toEqual([produtos[0], produtos[2]]);
});

it('should not remove product and return state unchanged', () => {
  const result = produtosReducer(produtos, {
    type: 'REMOVER_PRODUTO',
    produto: { id: '456asddef' },
  });

  expect(result).toEqual(produtos);
});

it('should set products', () => {
  const result = produtosReducer(undefined, {
    type: 'SET_PRODUTOS',
    produtos,
  });

  expect(result).toEqual(produtos);
});

it('should not set products', () => {
  const result = produtosReducer(undefined, {
    type: 'SET_PRODUTOS',
  });

  expect(result).toEqual(undefined);
});

it('should return empty array', () => {
  const result = produtosReducer(undefined, {
    type: 'ANYTHING',
  });

  expect(result).toEqual([]);
});

it('should return previous state', () => {
  const result = produtosReducer(produtos, {
    type: 'ANYTHING',
  });

  expect(result).toEqual(produtos);
});
