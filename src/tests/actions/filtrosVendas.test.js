import {
  setClienteFiltro,
  setDataVendaInicialFiltro,
  setDataVendaFinalFiltro,
  setStatusFiltro,
  limparFiltro,
} from '../../actions/filtrosVendas';

it('should receive object to set cliente', () => {
  const result = setClienteFiltro('Lamber');
  expect(result).toEqual({ type: 'SET_CLIENTE_FILTER', cliente: 'Lamber' });
});

it('should receive object to set data inicial', () => {
  const result = setDataVendaInicialFiltro('12313123');
  expect(result).toEqual({ type: 'SET_DATAVENDA_INICIAL_FILTER', dataVendaInicial: '12313123' });
});

it('should receive object to set data final', () => {
  const result = setDataVendaFinalFiltro('12312312312');
  expect(result).toEqual({ type: 'SET_DATAVENDA_FINAL_FILTER', dataVendaFinal: '12312312312' });
});

it('should receive object to set status', () => {
  const result = setStatusFiltro('concluida');
  expect(result).toEqual({ type: 'SET_STATUS_FILTER', status: 'concluida' });
});

it('should receive object to clean setters', () => {
  const result = limparFiltro();
  expect(result).toEqual({ type: 'CLEAN_FILTER' });
});