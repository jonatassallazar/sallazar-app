import produtosSelector from '../../selectors/produtos';
import produtos from '../fixtures/produtos';

it('should return all itens', () => {
  const result = produtosSelector(produtos, {
    nome: '',
    fornecedor: '',
    status: 'todos',
  });

  expect(result).toEqual(produtos);
});

it('should filter by name', () => {
  const result = produtosSelector(produtos, {
    nome: 'Purs',
    fornecedor: '',
    status: 'todos',
  });

  expect(result).toEqual([produtos[0]]);
});

it('should filter by name - no results', () => {
  const result = produtosSelector(produtos, {
    nome: 'asddasdd',
    fornecedor: '',
    status: 'todos',
  });

  expect(result).toEqual([]);
});

it('should filter by name in any case', () => {
  const result = produtosSelector(produtos, {
    nome: 'BAG',
    fornecedor: '',
    status: 'todos',
  });

  expect(result).toEqual([produtos[1]]);
});

it('should filter by name with special character', () => {
  const result = produtosSelector(produtos, {
    nome: 'Mullét',
    fornecedor: '',
    status: 'todos',
  });

  expect(result).toEqual([produtos[2]]);
});

it('should filter by fornecedor', () => {
  const result = produtosSelector(produtos, {
    nome: '',
    fornecedor: 'Jorgeclayvson',
    status: 'todos',
  });

  expect(result).toEqual([produtos[0], produtos[1]]);
});

it('should filter by fornecedor - no result', () => {
  const result = produtosSelector(produtos, {
    nome: '',
    fornecedor: 'asdailasdasd',
    status: 'todos',
  });

  expect(result).toEqual([]);
});

it('should filter by fornecedor in any case', () => {
  const result = produtosSelector(produtos, {
    nome: '',
    fornecedor: 'NORA',
    status: 'todos',
  });

  expect(result).toEqual([produtos[2]]);
});

it('should filter by fornecedor with special character', () => {
  const result = produtosSelector(produtos, {
    nome: '',
    fornecedor: 'NóRA',
    status: 'todos',
  });

  expect(result).toEqual([produtos[2]]);
});

it('should filter by nome and fornecedor', () => {
  const result = produtosSelector(produtos, {
    nome: 'Bag',
    fornecedor: 'Jorgeclayvson',
    status: 'todos',
  });

  expect(result).toEqual([produtos[1]]);
});

it('should filter by nome and fornecedor - no result', () => {
  const result = produtosSelector(produtos, {
    nome: 'adsada',
    fornecedor: 'delta@gmail',
    status: 'todos',
  });

  expect(result).toEqual([]);
});

it('should filter by status', () => {
  const result = produtosSelector(produtos, {
    nome: '',
    fornecedor: '',
    status: 'inativo',
  });

  expect(result).toEqual([produtos[2]]);
});

it('should filter by status - all results', () => {
  const result = produtosSelector(produtos, {
    nome: '',
    fornecedor: '',
    status: 'todos',
  });

  expect(result).toEqual(produtos);
});

it('should filter by status - no result', () => {
  const result = produtosSelector(produtos, {
    nome: '',
    fornecedor: '',
    status: '01253451415415414155',
  });

  expect(result).toEqual([]);
});

it('should filter by status and fornecedor', () => {
  const result = produtosSelector(produtos, {
    nome: '',
    fornecedor: 'Jorgeclayvson',
    status: 'ativo',
  });

  expect(result).toEqual([produtos[0], produtos[1]]);
});

it('should filter by status and fornecedor - no result', () => {
  const result = produtosSelector(produtos, {
    nome: '',
    fornecedor: 'delta@gmail',
    status: '140541541',
  });

  expect(result).toEqual([]);
});

it('should filter by nome, fornecedor and status', () => {
  const result = produtosSelector(produtos, {
    nome: 'Bag',
    fornecedor: 'Jorgeclayvson',
    status: 'ativo',
  });

  expect(result).toEqual([produtos[1]]);
});

it('should filter by nome, fornecedor and status - no result', () => {
  const result = produtosSelector(produtos, {
    nome: 'asdads',
    fornecedor: 'asdasd',
    status: 'asd',
  });

  expect(result).toEqual([]);
});
