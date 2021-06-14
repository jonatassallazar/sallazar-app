import moment from 'moment';
import { currencyFormatter } from '../../forms/utils/numbersFormatters';

const createTooltipHtml = (data, total, vendasDia) => {
  return `<div class="tooltip-style">
  <h6>${data.format('ll')}</h6>
  <div class="each-info-value blue">
    <p><b>Total do Dia:</b></p>
  </div>
    <span>R$ ${currencyFormatter(total)}</span>
    <div class="each-info-value red">
    <p><b>Vendas no dia:</b></p>
    </div>
    <span>${vendasDia}</span>
    <div class="each-info-value green">
    <p><b>Ticket Médio:</b></p>
    </div>
    <span>R$ ${currencyFormatter(total / vendasDia) || 0}</span>
    </div>`;
};

const createArrayChart = (selected, chartDate) => {
  return new Promise((resolve, reject) => {
    const rows = [];
    const dataInicial = moment(chartDate[0].startDate);
    const dataFinal = moment(chartDate[0].endDate);

    while (dataFinal.diff(dataInicial) >= 0) {
      const sameDay = selected.filter((i) =>
        moment(i.dataVenda).isSame(dataInicial, 'day')
      );

      const vendasDia = sameDay.length;
      const totalVendasDia = sameDay?.reduce((acc, cur) => acc + cur.total, 0) || 0;

      rows.push({
        c: [
          { v: dataInicial.format('D/M') },
          { v: totalVendasDia / 100 },
          { v: createTooltipHtml(dataInicial, totalVendasDia, vendasDia) },
        ],
      });

      dataInicial.add(1, 'days');
    }

    const columns = [
      { type: 'string', label: 'Data da Venda', role: 'domain' },
      { type: 'number', label: 'Total da Venda' },
      { type: 'string', role: 'tooltip', p: { html: true } },
    ];

    const data = { cols: columns, rows: rows, p: null };

    resolve(JSON.stringify(data));
  });
};

export default createArrayChart;
