import filtrosVendasReducer from '../../reducers/filtrosVendas';
import moment from 'moment';

jest.mock('moment', () => () => ({
  valueOf: () => '2021–05–30T12:34:56+00:00',
  subtract: () => ({
    valueOf: () => '2021–01–30T12:34:56+00:00',
  }),
}));

const statePadraoFiltroVendas = {
  cliente: '',
  dataVendaInicial: moment(0).subtract(90, 'days').valueOf(),
  dataVendaFinal: moment(0).valueOf(),
  status: 'todos',
};

it('should set nome on filter', () => {
  const result = filtrosVendasReducer(undefined, {
    type: 'SET_CLIENTE_FILTER',
    cliente: 'Delta',
  });
  expect(result).toEqual({
    ...statePadraoFiltroVendas,
    cliente: 'Delta',
  });
});

it('should set status on filter', () => {
  const result = filtrosVendasReducer(undefined, {
    type: 'SET_STATUS_FILTER',
    status: 'ativo',
  });
  expect(result).toEqual({
    ...statePadraoFiltroVendas,
    status: 'ativo',
  });
});

it('should set data inicial on filter', () => {
  const result = filtrosVendasReducer(undefined, {
    type: 'SET_DATAVENDA_INICIAL_FILTER',
    dataVendaInicial: '15100',
  });
  expect(result).toEqual({
    ...statePadraoFiltroVendas,
    dataVendaInicial: '15100',
  });
});

it('should set data final on filter', () => {
  const result = filtrosVendasReducer(undefined, {
    type: 'SET_DATAVENDA_FINAL_FILTER',
    dataVendaFinal: '25000',
  });
  expect(result).toEqual({
    ...statePadraoFiltroVendas,
    dataVendaFinal: '25000',
  });
});

it('should clean filters', () => {
  const result = filtrosVendasReducer(undefined, {
    type: 'CLEAN_FILTER',
  });
  expect(result).toEqual(statePadraoFiltroVendas);
});
