export default (state = {}, action) => {
    switch (action.type) {
        case 'REMOVER_ENDERECO':
            return state.endereco = {}
        case 'SET_ENDERECO':
            return action.endereco;
        default:
            return state
    }
}