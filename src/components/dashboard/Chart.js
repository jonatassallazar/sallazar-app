import styled from 'styled-components';
import { Chart as GoogleChart } from 'react-google-charts';

const ChartSection = styled.div`
  grid-column-start: 1;
  grid-column-end: 4;
  width: 100%;
  height: 240px;
`;

const StyledGoogleChart = styled(GoogleChart)``;

const Chart = ({ vendas }) => {
  console.log(vendas);
  return (
    <ChartSection>
      <StyledGoogleChart
        width={'100%'}
        chartType="LineChart"
        data={vendas}
        legendToggle
        loader={<div>Loading Chart</div>}
        options={{
          hAxis: {
            title: 'Período',
          },
          vAxis: {
            title: 'Valor',
          },
        }}
      />
    </ChartSection>
  );
};

export default Chart;
