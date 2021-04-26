import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FiltroProduto from './FiltroProduto';
import ProdutoItem from './ProdutoItem';
import selectProdutos from '../../selectors/produtos';
import Add from '@material-ui/icons/Add';
import { startSetProdutos } from '../../actions/produtos';
import ListaItens from '../listas/ListaItens';
import { StyledButton } from '../forms/elements';

const Produto = () => {
  const selection = useSelector((state) =>
    selectProdutos(state.produtos, state.filtrosProdutos)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startSetProdutos());
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1>Lista de Produtos</h1>
      <StyledButton
        variant="contained"
        color="primary"
        startIcon={<Add />}
        component={Link}
        to="/produtos/novo"
      >
        Novo Produto
      </StyledButton>
      <FiltroProduto />
      <ListaItens>
        {selection.map((produto) => (
          <ProdutoItem key={produto.id} {...produto} />
        ))}
      </ListaItens>
    </div>
  );
};

export { Produto as default };
