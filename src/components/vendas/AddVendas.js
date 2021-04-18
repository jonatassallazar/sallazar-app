import React from 'react';
import { useDispatch } from 'react-redux';
import { startAddVenda } from '../../actions/vendas';
import VendaForm from './VendaForm';

const AddVenda = (props) => {
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Novo Venda</h1>
      <VendaForm
        onSubmit={(data) => {
          dispatch(startAddVenda(data));
          props.history.push('/vendas');
        }}
      />
    </div>
  );
};

export { AddVenda as default };
