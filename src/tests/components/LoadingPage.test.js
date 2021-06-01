import { render, screen } from '../utils/render';
import { LoadingPage } from '../../components';

it('should have a gif', () => {
  render(<LoadingPage />);

  expect(screen.getByRole('img')).toHaveAttribute('src', '/img/loading.gif');
});
