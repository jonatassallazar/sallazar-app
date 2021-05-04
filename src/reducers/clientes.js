const clientesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_CLIENTE':
      return [...state, action.cliente];
    case 'REMOVER_CLIENTE':
      return state.filter(({ id }) => id !== action.cliente.id);
    case 'EDITAR_CLIENTE':
      return state.map((cliente) => {
        if (cliente.id === action.id) {
          return {
            ...cliente,
            ...action.updates,
          };
        } else {
          return cliente;
        }
      });
    case 'SET_CLIENTES':
      return action.clientes;
    default:
      return state;
  }
};

export default clientesReducer;