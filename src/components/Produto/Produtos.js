import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FiltroProduto from './FiltroProduto';
import ProdutoItem from './ProdutoItem';
import selectProdutos from '../../selectors/produtos';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import { startSetProdutos } from '../../actions/produtos';
import ListaItens from '../listas/ListaItens';

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
      <h1>Produtos</h1>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        component={Link}
        to="/produtos/novo"
      >
        Novo Produto
      </Button>
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
