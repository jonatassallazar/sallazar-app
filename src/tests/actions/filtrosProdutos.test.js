import {
  setFornecedorFiltro,
  setNomeFiltro,
  setStatusFiltro,
  limparFiltro,
} from '../../actions/filtrosProdutos';

it('should receive object to set nome', () => {
  const result = setNomeFiltro('Lamber');
  expect(result).toEqual({ type: 'SET_NOME_FILTER', nome: 'Lamber' });
});

it('should receive object to set email', () => {
  const result = setFornecedorFiltro('Kyle Ltda.');
  expect(result).toEqual({ type: 'SET_FORNECEDOR_FILTER', fornecedor: 'Kyle Ltda.' });
});

it('should receive object to set telefone', () => {
  const result = setStatusFiltro('ativo');
  expect(result).toEqual({ type: 'SET_STATUS_FILTER', status: 'ativo' });
});

it('should receive object to clean setters', () => {
  const result = limparFiltro();
  expect(result).toEqual({ type: 'CLEAN_FILTER' });
});