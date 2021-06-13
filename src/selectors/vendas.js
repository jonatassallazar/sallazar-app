import moment from 'moment';

const vendasSelector = (
  vendas,
  { cliente, status, dataVendaInicial, dataVendaFinal }
) => {
  return vendas.filter((venda) => {
    let dataVendaMatch;

    if (
      moment(venda.dataVenda).isSameOrAfter(dataVendaInicial, 'day') &&
      moment(venda.dataVenda).isSameOrBefore(dataVendaFinal, 'day')
    ) {
      dataVendaMatch = true;
    } else {
      dataVendaMatch = false;
    }

    const clienteMatch = venda.cliente.nome
      ?.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .includes(
        cliente
          ?.toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
      );

    let statusMatchText;

    if (status === 'todos') {
      const statusMatch = !venda.status?.toLowerCase().includes('cancelada');
      statusMatchText = statusMatch;
    } else {
      const statusMatch = venda.status
        ?.toLowerCase()
        .includes(status?.toLowerCase());
      statusMatchText = statusMatch;
    }

    return dataVendaMatch && clienteMatch && statusMatchText;
    // eslint-disable-next-line
  });
};

export default vendasSelector;
