import vendasReducer from '../../reducers/vendas';
import vendas from '../fixtures/vendas';

it('should add venda and return new object', () => {
  const result = vendasReducer(undefined, {
    type: 'ADD_VENDA',
    venda: vendas[0],
  });

  expect(result).toEqual([vendas[0]]);
});

it('should add new venda and return object with previous state', () => {
  const result = vendasReducer([vendas[0]], {
    type: 'ADD_VENDA',
    venda: vendas[1],
  });

  expect(result).toEqual([vendas[0], vendas[1]]);
});

it('should edit venda and return new array', () => {
  const result = vendasReducer(vendas, {
    type: 'EDITAR_VENDA',
    id: '456def',
    updates: {
      cliente: { nome: 'Omega Prime' },
    },
  });

  expect(result).toEqual([
    vendas[0],
    { ...vendas[1], cliente: { nome: 'Omega Prime' } },
    vendas[2],
  ]);
});

it('should not edit venda and return state unchanged', () => {
  const result = vendasReducer(vendas, {
    type: 'EDITAR_VENDA',
    id: '456sdef',
    updates: {
      cliente: { nome: 'Omega Prime' },
    },
  });

  expect(result).toEqual(vendas);
});

it('should remove venda and return new array', () => {
  const result = vendasReducer(vendas, {
    type: 'REMOVER_VENDA',
    venda: { id: '456def' },
  });

  expect(result).toEqual([vendas[0], vendas[2]]);
});

it('should not remove venda and return state unchanged', () => {
  const result = vendasReducer(vendas, {
    type: 'REMOVER_VENDA',
    venda: { id: '456asddef' },
  });

  expect(result).toEqual(vendas);
});

it('should set vendas', () => {
  const result = vendasReducer(undefined, {
    type: 'SET_VENDAS',
    vendas,
  });

  expect(result).toEqual(vendas);
});

it('should not set vendas', () => {
  const result = vendasReducer(undefined, {
    type: 'SET_VENDAS',
  });

  expect(result).toEqual(undefined);
});

it('should return empty array', () => {
  const result = vendasReducer(undefined, {
    type: 'ANYTHING',
  });

  expect(result).toEqual([]);
});

it('should return previous state', () => {
  const result = vendasReducer(vendas, {
    type: 'ANYTHING',
  });

  expect(result).toEqual(vendas);
});
