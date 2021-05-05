const vendasSelector = (
  vendas,
  { cliente, status, dataVendaInicial, dataVendaFinal }
) => {
  return vendas
    .filter((venda) => {
      let dataVendaMatch;

      if (
        dataVendaInicial <= venda.dataVenda &&
        dataVendaFinal >= venda.dataVenda
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
      console.log(dataVendaMatch);

      return dataVendaMatch && clienteMatch && statusMatchText;
      // eslint-disable-next-line
    })
};

export default vendasSelector;