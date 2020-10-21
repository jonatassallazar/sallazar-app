export default (state = {}, action) => {
    switch (action.type) {
        case 'REMOVER_ENDERECO':
            return {}
        case 'SET_ENDERECO':
            return action.endereco
        default:
            return state
    }
}