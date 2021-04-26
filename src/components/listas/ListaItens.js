import styled from 'styled-components';

const ListaItens = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
`;

ListaItens.Item = styled.div`
  background-color: ${({ theme }) => theme.colors.bgColorDark};;
  border-radius: ${({ theme }) => theme.boxes.borderRadius};;
  padding: ${({ theme }) => theme.spacing.medium} ${({ theme }) => theme.spacing.large};
  margin: ${({ theme }) => theme.spacing.small} 0;
  box-shadow: ${({ theme }) => theme.boxes.boxShadow};
  border-left: ${({ theme }) => theme.colors.primary} solid 8px;

  a {
    color: #1d1d1d;
    text-decoration: none;
    font-size: 1.4rem;
  }
`;

export default ListaItens;
