const vendasReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_VENDA':
      return [...state, action.venda];
    case 'REMOVER_VENDA':
      return state.filter(({ id }) => id !== action.venda.id);
    case 'EDITAR_VENDA':
      return state.map((venda) => {
        if (venda.id === action.id) {
          return {
            ...venda,
            ...action.updates,
          };
        } else {
          return venda;
        }
      });
    case 'SET_VENDAS':
      return action.vendas;
    default:
      return state;
  }
};

export default vendasReducer;