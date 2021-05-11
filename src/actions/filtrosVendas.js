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

export const limparFiltro = () => ({
  type: 'CLEAN_FILTER',
});