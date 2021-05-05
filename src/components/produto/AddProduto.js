import React from 'react';
import { useDispatch } from 'react-redux';
import { startAddProduto } from '../../actions/produtos';
import ProdutoForm from './ProdutoForm';
import { StyledButton } from '../forms/elements';
import { ArrowBackIos } from '@material-ui/icons';

const AddProduto = (props) => {
  const dispatch = useDispatch();

  return (
    <>
      <StyledButton.Link to="/produtos">
        <StyledButton.OnlyIcon>
          <ArrowBackIos />
        </StyledButton.OnlyIcon>
      </StyledButton.Link>
      <h1>Adicionar Produto</h1>
      <ProdutoForm
        onSubmit={(data) => {
          dispatch(startAddProduto(data));
          props.history.push('/produtos');
        }}
      />
    </>
  );
};

export { AddProduto as default };
