import styled from 'styled-components';

const Listagem = styled.div``;

Listagem.Title = styled.h1`
  font-size: ${({ theme }) => theme.font.large};
  color: ${({ theme }) => theme.colors.text};
`;

export default Listagem;