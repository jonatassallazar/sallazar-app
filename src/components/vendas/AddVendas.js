import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startAddVenda, startSetVendas } from '../../actions/vendas';
import VendaForm from './VendaForm';

const AddVenda = (props) => {
  const dispatch = useDispatch();
  const [numeroVenda, setNumeroVenda] = useState('');

  const vendas = useSelector((state) => state.vendas);

  useEffect(() => {
    dispatch(startSetVendas());
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    const numero = '00000' + vendas.length;
    const numeroVenda = numero.substr(numero.length - 5);
    setNumeroVenda(numeroVenda)
    // eslint-disable-next-line
  }, [vendas]);


  return (
    <div>
      <h1>Nova Venda</h1>
      <VendaForm
        vendas={vendas}
        numero={numeroVenda}
        onSubmit={(data) => {
          dispatch(startAddVenda(data));
          props.history.push('/vendas');
        }}
      />
    </div>
  );
};

export { AddVenda as default };
