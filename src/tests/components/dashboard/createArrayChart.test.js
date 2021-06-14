import { subDays } from 'date-fns';
import createArrayChart from '../../../components/dashboard/utils/createArrayChart';
import vendas from '../../fixtures/vendas';

const chartDate = [
  {
    startDate: subDays(new Date(), 30),
    endDate: new Date(),
    key: 'selection',
    color: '#1976d2',
  },
];

it('should return promise with data', () => {
  return createArrayChart(vendas, chartDate).then((result) => {
    return expect(result).toBeTruthy();
  });
});
