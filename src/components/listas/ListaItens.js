import styled from 'styled-components';

const ListaItens = styled.table`
  width: 100%;
`;

ListaItens.Header = styled.tr`
  width: 100%;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.boxes.borderRadius} ${({ theme }) => theme.boxes.borderRadius} 0 0;
  border-left: ${({ theme }) => theme.colors.primary} solid 8px;
  box-shadow: ${({ theme }) => theme.boxes.boxShadow};
  color: ${({ theme }) => theme.colors.pText};
  display: inline-grid;
  margin: ${({ theme }) => theme.spacing.small} 0;
  padding: ${({ theme }) => theme.spacing.medium} ${({ theme }) => theme.spacing.small};
  justify-items: center;

  th {
    margin: 0;
    font-size: ${({ theme }) => theme.font.small};
  }
`;

ListaItens.Item = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.bgColorDark};
  border-radius: ${({ theme }) => theme.boxes.borderRadius};
  border-left: ${({ theme }) => theme.colors.primary} solid 8px;
  box-shadow: ${({ theme }) => theme.boxes.boxShadow};
  display: inline-grid;
  grid-template-columns: 6fr 5fr 20fr;
  margin: 0.25rem 0;
  padding: ${({ theme }) => theme.spacing.medium} ${({ theme }) => theme.spacing.small};
  column-gap: ${({ theme }) => theme.spacing.medium}; 
  grid-auto-flow: column;
  justify-items: center;

  a {
    color: #1d1d1d;
    text-decoration: none;
    font-size: 1.4rem;
  }

  h3 {
    margin: ${({ theme }) => theme.spacing.small} 0;
    font-size: ${({ theme }) => theme.font.medium};
  }

  p {
    margin: ${({ theme }) => theme.spacing.small} 0;
    font-size: ${({ theme }) => theme.font.small};
    text-align: center;
  }

  .tag {
    border-radius: 15px;
    padding: 0.2rem ${({ theme }) => theme.spacing.medium};
    font-size: calc(${({ theme }) => theme.font.small} - 0.1rem);
    font-weight: 500;
    color: #ffffff;
  }

  .tag-amarela {
    background-color: #d8a200;
  }

  .tag-verde {
    background-color: #189a37;
  }
  .tag-azul {
    background-color: #1976d2;
  }
  .tag-roxa {
    background-color: #9c27b0;
  }
  .tag-marrom {
    background-color: #795548;
  }
  .tag-preta {
    background-color: #404040;
  }
  .tag-vermelha {
    background-color: #c72d22;
  }
`;

export default ListaItens;
