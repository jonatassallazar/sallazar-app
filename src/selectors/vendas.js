export default (vendas, { sortBy, cliente, status, dataVenda}) => {
    return vendas.filter((venda) => {
        const dataVendaMatch = venda.dataVenda.toLowerCase().includes(dataVenda.toLowerCase())
        const clienteMatch = venda.cliente.toLowerCase().includes(cliente.toLowerCase())
        const statusMatch = venda.status.toLowerCase().includes(status.toLowerCase())

        return dataVendaMatch && clienteMatch && statusMatch
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