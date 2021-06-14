import { useState } from 'react';
import styled from 'styled-components';
import { Chart as GoogleChart } from 'react-google-charts';
import Tipografia from '../layout/Tipografia';
import { DateRangePicker } from 'react-date-range';
import StyledButton from '../forms/elements/StyledButton';
import ptBR from 'date-fns/locale/pt-BR';
import { defaultStaticRanges, defaultInputRanges } from './CustomRangeLabels';
import moment from 'moment';

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file'

const ChartSection = styled.div`
  grid-column-start: 1;
  grid-column-end: 4;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.medium};

  h1 {
    padding-top: ${({ theme }) => theme.spacing.medium};
  }
`;

ChartSection.Button = styled.div`
  position: absolute;
  z-index: 5;
  top: 17px;
  right: 0;
`;

ChartSection.Modal = styled.div`
  position: absolute;
  z-index: 5;
  top: -60px;
  right: 150px;
  box-shadow: ${({ theme }) => theme.boxes.boxShadow};
`;

const StyledGoogleChart = styled(GoogleChart)`
  div.google-visualization-tooltip {
    border-radius: ${({ theme }) => theme.boxes.borderRadius};
    padding: ${({ theme }) => theme.spacing.medium} ${({ theme }) => theme.spacing.small};
  }

  .tooltip-style {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 200px;
    align-items: center;

    h6 {
      font-size: calc(${({ theme }) => theme.font.huge} * 0.35);
      font-weight: 800;
      margin: calc(${({ theme }) => theme.spacing.huge} * 0.1) 0
        calc(${({ theme }) => theme.spacing.huge} * 0.3);
    }

    p {
      font-size: calc(${({ theme }) => theme.font.huge} * 0.3);
      font-weight: 100;
      line-height: 1.2;
      margin: calc(${({ theme }) => theme.spacing.huge} * 0.05) 0;
    }

    span {
      font-size: calc(${({ theme }) => theme.font.huge} * 0.4);
      font-weight: 100;
      margin: calc(${({ theme }) => theme.spacing.huge} * 0.05) 0;
    }
  }

  .color-column {
    width: 12px;
    height: 12px;
    position: relative;
    border-radius: 50%;
    margin-right: 8px;
  }
  .blue {
    color: white;
    background-color: #1976d2;
  }
  .red {
    color: white;
    background-color: #c72d22;
  }
  .green {
    color: white;
    background-color: #189a37;
  }

  .each-info-value {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    align-items: center;
    width: 80%;
    border-radius: 12px;
  }
`;

const Chart = ({ vendas, DashboardLayout, chartDate, setChartDate }) => {
  const [modalData, setModalData] = useState(false);

  return (
    <ChartSection>
      <DashboardLayout.Sub>
        <Tipografia.H6>Gráfico de Vendas</Tipografia.H6>
        <ChartSection.Button>
          <StyledButton
            data-testid="data-range-button-display"
            title="Clique aqui para escolher o período desejado"
            onClick={() => setModalData(!modalData)}
            onBlur={() => setModalData(false)}
          >
            Período ({moment(chartDate[0].startDate).format('DD/MM')} -{' '}
            {moment(chartDate[0].endDate).format('DD/MM')})
          </StyledButton>
        </ChartSection.Button>
        {modalData && (
          <ChartSection.Modal data-testid="modal-calendar">
            <DateRangePicker
              onChange={(item) => setChartDate([item.selection])}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={1}
              ranges={chartDate}
              direction="horizontal"
              locale={ptBR}
              weekdayDisplayFormat="EEEEEE"
              weekStartsOn={1}
              hasCustomRendering={true}
              staticRanges={defaultStaticRanges}
              inputRanges={defaultInputRanges}
              dateDisplayFormat="dd/MM/yy"
            />
          </ChartSection.Modal>
        )}
        <StyledGoogleChart
          data-testid="chart"
          chartLanguage={'pt-BR'}
          width={'100%'}
          chartType="LineChart"
          data={vendas}
          legendToggle
          loader={<div>Loading Chart</div>}
          options={{
            colors: ['#1976d2', '#e57373'],
            hAxis: {
              format: 'd/MMM',
              gridlines: { color: 'white', minSpacing: 35 },
              showTextEvery: 7,
              maxTextLines: 0,
              minTextSpacing: 100,
            },
            vAxis: {
              format: 'currency',
              gridlines: { color: '#8e8e8e', minSpacing: 40 },
              minorGridlines: { color: 'white' },
              baselineColor: 'white',
            },
            animation: {
              duration: 500,
              startup: true,
              easing: 'inAndOut',
            },
            tooltip: {
              isHtml: true,
              ignoreBounds: true,
              showColorCode: true,
              textStyle: {
                color: '#333333',
                fontSize: '16',
              },
            },
          }}
        />
      </DashboardLayout.Sub>
    </ChartSection>
  );
};

export default Chart;
