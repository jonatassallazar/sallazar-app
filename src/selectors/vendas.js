export default (vendas, { sortBy, cliente, status, dataVendaInicial, dataVendaFinal}) => {
    return vendas.filter((venda) => {
        const dataVendaMatch = true

        if (dataVendaInicial < venda.dataVenda || dataVendaFinal > venda.dataVenda) {
            return false
        } 

        const clienteMatch = venda.cliente.toLowerCase().includes(cliente.toLowerCase())
        const statusMatch = venda.status.toLowerCase().includes(status.toLowerCase())

        let statusMatchText

        if (statusMatch === 'todos') {
            statusMatchText = ''
        } else {
            statusMatchText = statusMatch
        }

        return dataVendaMatch && clienteMatch && statusMatchText
        // eslint-disable-next-line
    }).sort((a, b) => {
        switch (sortBy) {
            case 'dataVendaasc':
                return a.dataVenda > b.dataVenda ? 1 : -1
            case 'dataVendadec':
                return a.dataVenda < b.dataVenda ? 1 : -1
            case 'totalasc':
                return a.total > b.total ? 1 : -1
            case 'totaldec':
                return a.total < b.total ? 1 : -1
            case 'createdatasc':
                return a.createdAt > b.createdAt ? 1 : -1
            case 'craetedatdec':
                return a.createdAt < b.createdAt ? 1 : -1
            default:
                break;
        }
    })
}