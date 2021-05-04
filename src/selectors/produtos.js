const produtosSelector = (
  produtos,
  { nome, sortBy, fornecedor, status, valorVenda, createdAt }
) => {
  return produtos
    .filter((produto) => {
      const nomeMatch = produto.nome.toLowerCase().includes(nome.toLowerCase());
      const fornecedorMatch = produto.fornecedor
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .includes(
          fornecedor
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
        );

      let statusMatchText;

      if (status === 'todos') {
        statusMatchText = true;
      } else {
        const statusMatch = produto.status
          .toLowerCase()
          .includes(status.toLowerCase());
        statusMatchText = statusMatch;
      }

      return nomeMatch && fornecedorMatch && statusMatchText;
      // eslint-disable-next-line
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'nomeasc':
          return a.nome > b.nome ? 1 : -1;
        case 'nomedec':
          return a.nome < b.nome ? 1 : -1;
        case 'precoasc':
          return a.valorVenda > b.valorVenda ? 1 : -1;
        case 'precodec':
          return a.valorVenda < b.valorVenda ? 1 : -1;
        case 'createdatasc':
          return a.createdAt > b.createdAt ? 1 : -1;
        case 'craetedatdec':
          return a.createdAt < b.createdAt ? 1 : -1;
        default:
          return undefined;
      }
    });
};

export default produtosSelector;