export default (state = [], action) => {
    switch (action.type) {
        case 'ADD_PRODUTO':
            return [
                ...state,
                action.produto
            ]
        case 'REMOVER_PRODUTO':
            return state.filter(({ id }) => id !== action.produto.id)
        case 'EDITAR_PRODUTO':
            return state.map((produto) => {
                if (produto.id === action.id) {
                    return {
                        ...produto,
                        ...action.updates
                    }
                } else {
                    return produto
                }
            })
        case 'SET_PRODUTOS':
            return action.produtos
        default:
            return state
    }
}