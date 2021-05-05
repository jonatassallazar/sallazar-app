import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  startEditProduto,
  startRemoveProduto,
  startSetProdutos,
} from '../../actions/produtos';
import ProdutoForm from './ProdutoForm';
import { StyledButton } from '../forms/elements';
import { ArrowBackIos } from '@material-ui/icons';

const EditarProduto = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startSetProdutos());
    // eslint-disable-next-line
  }, []);

  const produto = useSelector((state) => {
    return state.produtos.find(
      (produto) => produto.id === props.match.params.id
    );
  });

  const onSubmit = (data) => {
    dispatch(startEditProduto(produto.id, data)).then(() =>
      props.history.push(`/produtos`)
    );
  };

  const handleDelete = () => {
    dispatch(startRemoveProduto({ id: produto.id })).then(() => {
      props.history.push('/produtos');
    });
  };

  return (
    <div>
      <StyledButton.Link to="/produtos">
        <StyledButton.OnlyIcon>
          <ArrowBackIos />
        </StyledButton.OnlyIcon>
      </StyledButton.Link>
      <h1>Editar Produto</h1>
      <ProdutoForm
        produto={produto}
        onSubmit={onSubmit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export { EditarProduto as default };
