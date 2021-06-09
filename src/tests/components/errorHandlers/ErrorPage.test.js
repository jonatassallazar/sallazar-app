import { render, screen } from '../../utils/render';
import { ErrorPage } from '../../../components';

it('should have a title', () => {
  render(<ErrorPage />);

  expect(screen.getByText('Oops...')).toBeInTheDocument();
});

it('should have a gif', () => {
  render(<ErrorPage />);

  expect(screen.getByRole('img')).toBeInTheDocument();
});

it('should have a sub title', () => {
  render(<ErrorPage />);

  expect(
    screen.getByText(/Algo não aconteceu como esperado/)
  ).toBeInTheDocument();
});

it('should have a description based on props - hasLogged true', () => {
  render(<ErrorPage hasLogged={true} />);

  expect(
    screen.getByText(/nosso time já foi notificado do problema/)
  ).toBeInTheDocument();
});

it('should have a description based on props - hasLogged false', () => {
  render(<ErrorPage hasLogged={false} />);

  expect(
    screen.getByText(/Não conseguimos capturar automaticamente o erro/)
  ).toBeInTheDocument();
});

it('should have error displayed on screen based on props', () => {
  render(<ErrorPage hasLogged={false} logMessage="TESTING ERROR" />);

  expect(screen.getByText('TESTING ERROR')).toBeInTheDocument();
});
