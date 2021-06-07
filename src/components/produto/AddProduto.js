import React from 'react';
import { useDispatch } from 'react-redux';
import { startAddProduto } from '../../actions/produtos';
import ProdutoForm from './ProdutoForm';
import { StyledButton } from '../forms/elements';
import { ArrowBackIos } from '@material-ui/icons';

const AddProduto = (props) => {
  const dispatch = useDispatch();

  const handleSubmit = (data) => {
    if (props.handleSubmit) {
      dispatch(startAddProduto(data)).then((res) => {
        props.handleSubmit(res.produto);
      });
    } else {
      dispatch(startAddProduto(data)).then(() => {
        props.history.push('/produtos');
      });
    }
  };

  return (
    <>
      {!props.showBackButton && (
        <StyledButton.Link to="/produtos">
          <StyledButton.OnlyIcon>
            <ArrowBackIos />
          </StyledButton.OnlyIcon>
        </StyledButton.Link>
      )}
      <h1>Novo Produto</h1>
      <ProdutoForm
        onSubmit={handleSubmit}
      />
    </>
  );
};

export { AddProduto as default };
