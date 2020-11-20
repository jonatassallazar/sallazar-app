export default (produtos, { nome, sortBy, fornecedor, status, valorVenda, createdAt }) => {
    return produtos.filter((produto) => {
        const nomeMatch = produto.nome.toLowerCase().includes(nome.toLowerCase())
        const fornecedorMatch = produto.fornecedor.toLowerCase().includes(fornecedor.toLowerCase())
        const statusMatch = produto.status.toLowerCase().includes(status.toLowerCase())

        return nomeMatch && fornecedorMatch && statusMatch
        // eslint-disable-next-line
    }).sort((a, b) => {
        switch (sortBy) {
            case 'nomeasc':
                return a.nome > b.nome ? 1 : -1
            case 'nomedec':
                return a.nome < b.nome ? 1 : -1
            case 'precoasc':
                return a.valorVenda > b.valorVenda ? 1 : -1
            case 'precodec':
                return a.valorVenda < b.valorVenda ? 1 : -1
            case 'createdatasc':
                return a.createdAt > b.createdAt ? 1 : -1
            case 'craetedatdec':
                return a.createdAt < b.createdAt ? 1 : -1
            default:
                break;
        }
    })
}