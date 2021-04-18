import React from 'react';
import { useDispatch } from 'react-redux';
import { startAddProduto } from '../../actions/produtos';
import ProdutoForm from './ProdutoForm';

const AddProduto = (props) => {
  const dispatch = useDispatch();

  return (
    <ProdutoForm
      onSubmit={(data) => {
        dispatch(startAddProduto(data));
        props.history.push('/produtos');
      }}
    />
  );
};

export { AddProduto as default };
