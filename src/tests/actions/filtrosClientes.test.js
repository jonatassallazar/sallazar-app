import {
  setEmailFiltro,
  setNomeFiltro,
  setTelefoneFiltro,
  limparFiltro,
} from '../../actions/filtrosClientes';

it('should receive object to set nome', () => {
  const result = setNomeFiltro('Lamber');
  expect(result).toEqual({ type: 'SET_NOME_FILTER', nome: 'Lamber' });
});

it('should receive object to set email', () => {
  const result = setEmailFiltro('test@test');
  expect(result).toEqual({ type: 'SET_EMAIL_FILTER', email: 'test@test' });
});

it('should receive object to set telefone', () => {
  const result = setTelefoneFiltro('199892');
  expect(result).toEqual({ type: 'SET_TELEFONE_FILTER', telefone: '199892' });
});

it('should receive object to clean setters', () => {
  const result = limparFiltro();
  expect(result).toEqual({ type: 'CLEAN_FILTER' });
});