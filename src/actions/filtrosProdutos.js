export const setNomeFiltro = (nome = '') => ({
  type: 'SET_NOME_FILTER',
  nome,
});

export const setFornecedorFiltro = (fornecedor = '') => ({
  type: 'SET_FORNECEDOR_FILTER',
  fornecedor,
});

export const setStatusFiltro = (status = '') => ({
  type: 'SET_STATUS_FILTER',
  status,
});

export const limparFiltro = () => ({
  type: 'CLEAN_FILTER',
});
