import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startSetVendas } from '../../actions/vendas';
import selectVendas from '../../selectors/vendas';
import styled from 'styled-components';
import Tipografia from '../layout/Tipografia';
import Calendar from 'react-calendar';
import StyledCalendar from '../layout/StyledCalendar';
import { currencyFormatter } from '../forms/utils/numbersFormatters';
import Chart from './Chart';

import moment from 'moment';
import 'moment/locale/pt-br'
moment.locale('pt-br')

const DashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 48% 4% 48%;
  width: 100%;
  align-items: flex-start;
  justify-items: center;
`;

DashboardLayout.Sub = styled.div`
  text-align: center;
  width: 100%;
  padding-bottom: ${({ theme }) => theme.spacing.large};
  box-shadow: ${({ theme }) => theme.boxes.boxShadow};
  border-radius: ${({ theme }) => theme.boxes.borderRadius};
`;

DashboardLayout.Faturamento = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
  width: 80%;

  span {
    background: #f6f6f6;
    font-size: ${({ theme }) => theme.font.small};
    font-weight: bold;
    line-height: 2;
    border-radius: 30px;
    padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.large};
  }

  .tag-verde {
    color: ${({ theme }) => theme.colors.bgColor};
    background-color: #189a37;
  }
  .tag-preta {
    color: ${({ theme }) => theme.colors.bgColor};
    background-color: ${({ theme }) => theme.colors.text};
  }
  .tag-vermelha {
    color: ${({ theme }) => theme.colors.bgColor};
    background-color: #c72d22;
  }
`;

DashboardLayout.Divisor = styled.div`
  background: ${({ theme }) => theme.colors.sText};
  height: 100%;
  width: 1px;
`;

const createTooltipHtml = (data, total) => {
  return `<div class="tooltip-style">
  <h6>${data.format('ll')}</h6>
  <div class="each-info-value">
    <div class="color-column"></div>
    <p><b>Total do Dia:</b> R$ ${total / 100}</p>
  </div>
  </div>`;
};

const Dashboard = () => {
  const dispatch = useDispatch();

  const { displayName } = useSelector((state) => state.auth);

  const [calendario, setCalendario] = useState(new Date());
  const [faturamentoMesAnterior, setFaturamentoMesAnterior] = useState(0);
  const [faturamentoMesAtual, setFaturamentoMesAtual] = useState(0);
  const [chartDataInicial, setChartDataInicial] = useState(
    moment().subtract(3, 'months').valueOf()
  );
  const [chartDataFinal, setChartDataFinal] = useState(moment().valueOf());

  console.log(chartDataFinal.valueOf());

  const vendasFiltradasGrafico = useSelector((state) => {
    const selected = selectVendas(state.vendas, {
      cliente: '',
      status: 'todos',
      dataVendaInicial: chartDataInicial,
      dataVendaFinal: chartDataFinal,
    });

    const rows = [];
    const dataInicial = moment(chartDataInicial);
    const dataFinal = moment(chartDataFinal);

    while (dataFinal.diff(dataInicial) >= 0) {
      const sameDay = selected.filter((i) =>
        moment(i.dataVenda).isSame(dataInicial, 'day')
      );
      const totalVendasDia =
        sameDay?.reduce((acc, cur) => acc + cur.total, 0) || 0;

      rows.push({
        c: [
          { v: Date(dataInicial.format('yyyy,m,d')) },
          { v: totalVendasDia / 100 },
          { v: createTooltipHtml(dataInicial, totalVendasDia) },
        ],
      });

      dataInicial.add(1, 'days');
    }

    const columns = [
      { type: 'string', label: 'Data da Venda' },
      { type: 'number', label: 'Total da Venda' },
      { type: 'string', role: 'tooltip', p: { html: true } },
    ];

    const data = { cols: columns, rows: rows, p: null };

    return JSON.stringify(data);
  });

  const vendasMesAnterior = useSelector((state) =>
    selectVendas(state.vendas, {
      cliente: '',
      status: 'todos',
      dataVendaInicial: moment().subtract(1, 'months').startOf('month'),
      dataVendaFinal: moment().subtract(1, 'months').endOf('month'),
    })
  );

  useEffect(() => {
    const newValue = vendasMesAnterior.reduce(
      (acc, cur) => acc + parseFloat(cur.total),
      0
    );

    setFaturamentoMesAnterior(newValue);
  }, [vendasMesAnterior]);

  const vendasMesAtual = useSelector((state) =>
    selectVendas(state.vendas, {
      cliente: '',
      status: 'todos',
      dataVendaInicial: moment().startOf('month'),
      dataVendaFinal: moment().endOf('month'),
    })
  );

  useEffect(() => {
    const newValue = vendasMesAtual.reduce(
      (acc, cur) => acc + parseFloat(cur.total),
      0
    );

    setFaturamentoMesAtual(newValue);
  }, [vendasMesAtual]);

  useEffect(() => {
    dispatch(startSetVendas());
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Tipografia.SPAN as="span">
        Seja Bem Vindo, {displayName}.
      </Tipografia.SPAN>
      <Tipografia.H1 as="h1">Dashboard</Tipografia.H1>
      <DashboardLayout>
        <Chart
          vendas={vendasFiltradasGrafico}
          DashboardLayout={DashboardLayout}
        />
        <DashboardLayout.Sub>
          <Tipografia.H6 as="h6">Faturamento Mensal</Tipografia.H6>
          <DashboardLayout.Faturamento>
            <div>
              <Tipografia.P as="p">Mês Anterior</Tipografia.P>
              <span className="tag-preta" data-testid="last-month-sales-value">
                R$ {currencyFormatter(faturamentoMesAnterior) || '0,00'}
              </span>
            </div>
            <div>
              <Tipografia.P as="p">Mês Atual</Tipografia.P>
              <span
                className={`${
                  faturamentoMesAtual > faturamentoMesAnterior
                    ? 'tag-verde'
                    : 'tag-vermelha'
                }`}
                data-testid="this-month-sales-value"
              >
                R$ {currencyFormatter(faturamentoMesAtual) || '0,00'}
              </span>
            </div>
          </DashboardLayout.Faturamento>
        </DashboardLayout.Sub>
        <DashboardLayout.Divisor />
        <DashboardLayout.Sub>
          <Tipografia.H6 as="h6">Calendário</Tipografia.H6>
          <StyledCalendar width="90%">
            <Calendar
              value={calendario}
              onChange={(value, e) => setCalendario(value)}
            />
          </StyledCalendar>
        </DashboardLayout.Sub>
      </DashboardLayout>
    </div>
  );
};

export default Dashboard;
