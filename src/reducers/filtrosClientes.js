//Filters Reducer

const statePadraoFiltroClientes = {
  nome: '',
  email: '',
  telefone: '',
  sortBy: 'nomeasc',
};

export default (state = statePadraoFiltroClientes, action) => {
  switch (action.type) {
    case 'SET_NOME_FILTER':
      return {
        ...state,
        nome: action.nome,
      };
    case 'SORT_BY_NOMEASC':
      return {
        ...state,
        sortBy: 'nomeasc',
      };
    case 'SORT_BY_NOMEDEC':
      return {
        ...state,
        sortBy: 'nomedec',
      };
    case 'SET_EMAIL_FILTER':
      return {
        ...state,
        email: action.email,
      };
    case 'SET_TELEFONE_FILTER':
      return {
        ...state,
        telefone: action.telefone,
      };
    default:
      return state;
  }
};
