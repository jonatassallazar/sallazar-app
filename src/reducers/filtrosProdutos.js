const statePadraoFiltroProdutos = {
  nome: '',
  fornecedor: '',
  status: 'todos',
  sortBy: 'createdatasc',
};

export default (state = statePadraoFiltroProdutos, action) => {
  switch (action.type) {
    case 'SET_NOME_FILTER':
      return {
        ...state,
        nome: action.nome,
      };
    case 'SORT_BY_NOME_ASC':
      return {
        ...state,
        sortBy: 'nomeasc',
      };
    case 'SORT_BY_NOME_DEC':
      return {
        ...state,
        sortBy: 'nomedec',
      };
    case 'SORT_BY_PRECO_ASC':
      return {
        ...state,
        sortBy: 'precoasc',
      };
    case 'SORT_BY_PRECO_DEC':
      return {
        ...state,
        sortBy: 'precodec',
      };
    case 'SORT_BY_CREATEDAT_ASC':
      return {
        ...state,
        sortBy: 'createdatasc',
      };
    case 'SORT_BY_CREATEDAT_DEC':
      return {
        ...state,
        sortBy: 'createdatdec',
      };
    case 'SET_STATUS_FILTER':
      return {
        ...state,
        status: action.status,
      };
    case 'SET_FORNECEDOR_FILTER':
      return {
        ...state,
        fornecedor: action.fornecedor,
      };
    default:
      return state;
  }
};
