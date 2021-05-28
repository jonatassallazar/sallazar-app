import vendasSelector from '../../selectors/vendas';
import vendas from '../fixtures/vendas';

const baseFilter = {
  cliente: '',
  status: 'todos',
  dataVendaInicial: 0,
  dataVendaFinal: 600,
};

it('should return sales active', () => {
  const result = vendasSelector(vendas, baseFilter);

  expect(result).toEqual([vendas[0], vendas[1]]);
});

it('should filter by cliente', () => {
  const result = vendasSelector(vendas, {
    ...baseFilter,
    cliente: 'Jr.',
  });

  expect(result).toEqual([vendas[0]]);
});

it('should filter by cliente - no results', () => {
  const result = vendasSelector(vendas, {
    ...baseFilter,
    cliente: 'asddasdd',
  });

  expect(result).toEqual([]);
});

it('should filter by cliente in any case', () => {
  const result = vendasSelector(vendas, {
    ...baseFilter,
    cliente: 'ChArLiE DELTA',
  });

  expect(result).toEqual([vendas[1]]);
});

it('should filter by cliente with special character', () => {
  const result = vendasSelector(vendas, {
    ...baseFilter,
    cliente: 'Chárlie',
  });

  expect(result).toEqual([vendas[1]]);
});

it('should filter by status', () => {
  const result = vendasSelector(vendas, {
    ...baseFilter,
    status: 'cancelada',
  });

  expect(result).toEqual([vendas[2]]);
});

it('should filter by status - all active sales results', () => {
  const result = vendasSelector(vendas, {
    ...baseFilter,
    status: 'todos',
  });

  expect(result).toEqual([vendas[0], vendas[1]]);
});

it('should filter by status - no result', () => {
  const result = vendasSelector(vendas, {
    ...baseFilter,
    status: '01253451415415414155',
  });

  expect(result).toEqual([]);
});

it('should filter by data inicial', () => {
  const result = vendasSelector(vendas, {
    ...baseFilter,
    dataVendaInicial: 100,
  });

  expect(result).toEqual([vendas[1]]);
});

it('should filter by data final', () => {
  const result = vendasSelector(vendas, {
    ...baseFilter,
    dataVendaFinal: 99,
  });

  expect(result).toEqual([vendas[0]]);
});