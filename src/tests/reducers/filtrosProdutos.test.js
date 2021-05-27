import filtrosProdutosReducer from '../../reducers/filtrosProdutos';

it('should set nome on filter', () => {
  const result = filtrosProdutosReducer(undefined, {
    type: 'SET_NOME_FILTER',
    nome: 'Bag',
  });
  expect(result).toEqual({
    nome: 'Bag',
    fornecedor: '',
    status: 'todos',
  });
});

it('should set status on filter', () => {
  const result = filtrosProdutosReducer(undefined, {
    type: 'SET_STATUS_FILTER',
    status: 'ativo',
  });
  expect(result).toEqual({
    nome: '',
    fornecedor: '',
    status: 'ativo',
  });
});

it('should set fornecedor on filter', () => {
  const result = filtrosProdutosReducer(undefined, {
    type: 'SET_FORNECEDOR_FILTER',
    fornecedor: 'Charlie',
  });
  expect(result).toEqual({
    nome: '',
    fornecedor: 'Charlie',
    status: 'todos',
  });
});

it('should clean filters', () => {
  const result = filtrosProdutosReducer(undefined, {
    type: 'CLEAN_FILTER',
  });
  expect(result).toEqual({
    nome: '',
    fornecedor: '',
    status: 'todos',
  });
});
