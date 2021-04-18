import styled from 'styled-components';

const ListaItens = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
`;

ListaItens.Item = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 1rem 2rem;
  margin: 0.4rem 0;
  box-shadow: #b3b3b3 1px 1px 3px;

  a {
    color: #1d1d1d;
    text-decoration: none;
    font-size: 1.4rem;
  }
`;

export default ListaItens;
