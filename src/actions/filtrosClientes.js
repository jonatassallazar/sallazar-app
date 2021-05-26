export const setNomeFiltro = (nome = '') => ({
  type: 'SET_NOME_FILTER',
  nome,
});

export const setEmailFiltro = (email = '') => ({
  type: 'SET_EMAIL_FILTER',
  email,
});

export const setTelefoneFiltro = (telefone = '') => ({
  type: 'SET_TELEFONE_FILTER',
  telefone,
});

export const limparFiltro = () => ({
  type: 'CLEAN_FILTER',
});