const statePadraoFiltroProdutos = {
  nome: '',
  fornecedor: '',
  status: 'todos',
};

const filtrosProdutosReducer = (state = statePadraoFiltroProdutos, action) => {
  switch (action.type) {
    case 'SET_NOME_FILTER':
      return {
        ...state,
        nome: action.nome,
      };
    case 'CLEAN_FILTER':
      return {
        nome: '',
        status: 'todos',
        fornecedor: '',
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

export default filtrosProdutosReducer;
