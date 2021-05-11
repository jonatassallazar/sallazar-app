//Filters Reducer

const statePadraoFiltroClientes = {
  nome: '',
  email: '',
  telefone: '',
};

const filtrosClientesReducer = (state = statePadraoFiltroClientes, action) => {
  switch (action.type) {
    case 'SET_NOME_FILTER':
      return {
        ...state,
        nome: action.nome,
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
    case 'CLEAN_FILTER':
      return {
        nome: '',
        email: '',
        telefone: '',
      };
    default:
      return state;
  }
};

export default filtrosClientesReducer;
