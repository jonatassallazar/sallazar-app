export const setClienteFiltro = (cliente = '') => ({
  type: 'SET_CLIENTE_FILTER',
  cliente,
});

export const setDataVendaInicialFiltro = (dataVendaInicial = '') => {
  const newValue = dataVendaInicial?.valueOf() || '';

  return {
    type: 'SET_DATAVENDA_INICIAL_FILTER',
    dataVendaInicial: newValue,
  };
};

export const setDataVendaFinalFiltro = (dataVendaFinal = '') => {
  const newValue = dataVendaFinal?.valueOf() || '';

  return {
    type: 'SET_DATAVENDA_FINAL_FILTER',
    dataVendaFinal: newValue,
  };
};

export const setStatusFiltro = (status = '') => ({
  type: 'SET_STATUS_FILTER',
  status,
});

export const limparFiltro = () => ({
  type: 'CLEAN_FILTER',
});
