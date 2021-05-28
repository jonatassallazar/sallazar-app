const produtosSelector = (produtos, { nome, fornecedor, status }) => {
  return produtos.filter((produto) => {
    const nomeMatch = produto.nome
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .includes(
        nome
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
      );

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
  });
};

export default produtosSelector;
