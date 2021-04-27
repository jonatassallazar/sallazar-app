export default (
  vendas,
  { sortBy, cliente, status, dataVendaInicial, dataVendaFinal }
) => {
  return vendas
    .filter((venda) => {
      let dataVendaMatch;

      if (
        dataVendaInicial < venda.dataVenda ||
        dataVendaFinal > venda.dataVenda
      ) {
        dataVendaMatch = true;
      } else {
        dataVendaMatch = false;
      }

      const clienteMatch = venda.cliente.nome
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .includes(
          cliente
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
        );

      let statusMatchText;

      if (status === 'todos') {
        statusMatchText = true;
      } else {
        const statusMatch = venda.status
          .toLowerCase()
          .includes(status.toLowerCase());
        statusMatchText = statusMatch;
      }

      return dataVendaMatch && clienteMatch && statusMatchText;
      // eslint-disable-next-line
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'numeroasc':
          return a.numero > b.numero ? 1 : -1;
        case 'numerodec':
          return a.numero < b.numero ? 1 : -1;
        case 'datavendaasc':
          return a.dataVenda > b.dataVenda ? 1 : -1;
        case 'datavendadec':
          return a.dataVenda < b.dataVenda ? 1 : -1;
        case 'totalasc':
          return a.total > b.total ? 1 : -1;
        case 'totaldec':
          return a.total < b.total ? 1 : -1;
        case 'createdatasc':
          return a.createdAt > b.createdAt ? 1 : -1;
        case 'createdatdec':
          return a.createdAt < b.createdAt ? 1 : -1;
        default:
          return undefined;
      }
    });
};
