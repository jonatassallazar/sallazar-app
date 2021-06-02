import { render, fireEvent, screen, history } from '../utils/render';
import { Menu } from '../../components';

it('should have a menu item Dashboard', () => {
  render(<Menu />);
  expect(screen.getByText('Dashboard')).toBeTruthy();
});

it('should go to Dashboard page on click', () => {
  render(<Menu />);
  fireEvent.click(screen.getByText('Dashboard'));
  expect(history.location).toHaveProperty('pathname', '/dashboard');
});

it('should have a menu item Clientes', () => {
  render(<Menu />);
  expect(screen.getByText('Clientes')).toBeTruthy();
});

it('should go to Clientes page on click', () => {
  render(<Menu />);
  fireEvent.click(screen.getByText('Clientes'));
  expect(history.location).toHaveProperty('pathname', '/clientes');
});

it('should have a menu item Produtos', () => {
  render(<Menu />);
  expect(screen.getByText('Produtos')).toBeTruthy();
});

it('should go to Produtos page on click', () => {
  render(<Menu />);
  fireEvent.click(screen.getByText('Produtos'));
  expect(history.location).toHaveProperty('pathname', '/produtos');
});

it('should have a menu item Vendas', () => {
  render(<Menu />);
  expect(screen.getByText('Vendas')).toBeTruthy();
});

it('should go to Vendas page on click', () => {
  render(<Menu />);
  fireEvent.click(screen.getByText('Vendas'));
  expect(history.location).toHaveProperty('pathname', '/vendas');
});

it('should have a menu item Relatórios', () => {
  render(<Menu />);
  expect(screen.getByText('Relatórios')).toBeTruthy();
});

it('should go to Relatórios page on click', () => {
  render(<Menu />);
  fireEvent.click(screen.getByText('Relatórios'));
  expect(history.location).toHaveProperty('pathname', '/relatorios');
});

it('should have a menu item Ajuda', () => {
  render(<Menu />);
  expect(screen.getByText('Ajuda')).toBeTruthy();
});

it('should go to Ajuda page on click', () => {
  render(<Menu />);
  fireEvent.click(screen.getByText('Ajuda'));
  expect(history.location).toHaveProperty('pathname', '/ajuda');
});
