export const setClienteFiltro = (cliente = '') => ({
  type: 'SET_CLIENTE_FILTER',
  cliente,
});

export const setDataVendaInicialFiltro = (dataVendaInicial = '') => ({
  type: 'SET_DATAVENDA_INICIAL_FILTER',
  dataVendaInicial,
});

export const setDataVendaFinalFiltro = (dataVendaFinal = '') => ({
  type: 'SET_DATAVENDA_FINAL_FILTER',
  dataVendaFinal,
});

export const setStatusFiltro = (status = '') => ({
  type: 'SET_STATUS_FILTER',
  status,
});

export const sortByNumeroAsc = () => ({
  type: 'SORT_BY_NUMERO_ASC',
});

export const sortByNumeroDec = () => ({
  type: 'SORT_BY_NUMERO_DEC',
});

export const sortByDataVendaAsc = () => ({
  type: 'SORT_BY_DATAVENDA_ASC',
});

export const sortByDataVendaDec = () => ({
  type: 'SORT_BY_DATAVENDA_DEC',
});

export const sortByValorTotalAsc = () => ({
  type: 'SORT_BY_VALORTOTAL_ASC',
});

export const sortByValorTotalDec = () => ({
  type: 'SORT_BY_VALORTOTAL_DEC',
});

export const sortByCreatedAtAsc = () => ({
  type: 'SORT_BY_CREATEDAT_ASC',
});

export const sortByCreatedAtDec = () => ({
  type: 'SORT_BY_CREATEDAT_DEC',
});
