import styled from 'styled-components';
import { Chart as GoogleChart } from 'react-google-charts';
import Tipografia from '../layout/Tipografia';

const ChartSection = styled.div`
  grid-column-start: 1;
  grid-column-end: 4;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.medium}; ;
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

    h6 {
      font-size: calc(${({ theme }) => theme.font.huge} * 0.35);
      font-weight: 800;
      margin: calc(${({ theme }) => theme.spacing.huge} * 0.1) 0;
    }

    p {
      font-size: calc(${({ theme }) => theme.font.huge} * 0.3);
      font-weight: 100;
      line-height: 1.2;
      margin: calc(${({ theme }) => theme.spacing.huge} * 0.1) 0;
    }
  }

  .color-column {
    width: 12px;
    height: 12px;
    background-color: #1976d2;
    position: relative;
    border-radius: 50%;
  }

  .each-info-value {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-content: center;
  }
`;

const Chart = ({ vendas, DashboardLayout }) => {
  return (
    <ChartSection>
      <DashboardLayout.Sub>
        <Tipografia.H6>Gráfico de Vendas</Tipografia.H6>
        <StyledGoogleChart
          chartLanguage={'pt-BR'}
          width={'100%'}
          chartType="LineChart"
          data={vendas}
          legendToggle
          loader={<div>Loading Chart</div>}
          options={{
            colors: ['#1976d2', '#e57373'],
            hAxis: {
              title: 'Período',
              format: 'd/MMM',
              gridlines: { color: 'white', minSpacing: 20 },
            },
            vAxis: {
              format: 'currency',
              gridlines: { color: '#8e8e8e', minSpacing: 40 },
              minorGridlines: { color: 'white' },
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
