const statePadraoFiltroVendas = {
    cliente: '',
    dataVendaInicial: null,
    dataVendaFinal: null,
    status: 'todos',
    sortBy: 'createdatasc'
}

export default (state = statePadraoFiltroVendas, action) => {
    switch (action.type) {
        case 'SET_CLIENTE_FILTER':
            return {
                ...state,
                cliente: action.cliente
            }
        case 'SORT_BY_NOME_ASC':
            return {
                ...state,
                sortBy: 'nomeasc'
            }
        case 'SORT_BY_NOME_DEC':
            return {
                ...state,
                sortBy: 'nomedec'
            }
        case 'SORT_BY_VALORTOTAL_ASC':
            return {
                ...state,
                sortBy: 'valorTotalasc'
            }
        case 'SORT_BY_VALORTOTAL_DEC':
            return {
                ...state,
                sortBy: 'valorTotaldec'
            }
        case 'SORT_BY_CREATEDAT_ASC':
            return {
                ...state,
                sortBy: 'createdatasc'
            }
        case 'SORT_BY_CREATEDAT_DEC':
            return {
                ...state,
                sortBy: 'createdatdec'
            }
        case 'SET_STATUS_FILTER':
            return {
                ...state,
                status: action.status
            }
        case 'SET_DATAVENDA_INICIAL_FILTER':
            return {
                ...state,
                dataVendaInicial: action.dataVendaInicial
            }
        case 'SET_DATAVENDA_FINAL_FILTER':
            return {
                ...state,
                dataVendaFinal: action.dataVendaFinal
            }
        default:
            return state
    }
}