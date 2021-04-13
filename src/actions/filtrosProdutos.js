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

export const sortByNomeAsc = () => ({
  type: 'SORT_BY_NOME_ASC',
});

export const sortByNomeDec = () => ({
  type: 'SORT_BY_NOME_DEC',
});

export const sortByPrecoAsc = () => ({
  type: 'SORT_BY_PRECO_ASC',
});

export const sortByPrecoDec = () => ({
  type: 'SORT_BY_PRECO_DEC',
});

export const sortByCreatedAtAsc = () => ({
  type: 'SORT_BY_CREATEDAT_ASC',
});

export const sortByCreatedAtDec = () => ({
  type: 'SORT_BY_CREATEDAT_DEC',
});
