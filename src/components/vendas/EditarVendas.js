import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  startEditVenda,
  startRemoveVenda,
  startSetVendas,
} from '../../actions/vendas';
import VendaForm from './VendaForm';

const EditarVenda = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startSetVendas());
    // eslint-disable-next-line
  }, []);

  const venda = useSelector((state) => {
    return state.vendas.find((venda) => venda.id === props.match.params.id);
  });

  console.log(venda);

  const onSubmit = (data) => {
    dispatch(startEditVenda(venda.id, data)).then(() =>
      props.history.push(`/vendas`)
    );
  };

  const handleDelete = () => {
    dispatch(startRemoveVenda({ id: venda.id })).then(() => {
      props.history.push('/vendas');
    });
  }

  return (
    <div>
      <h1>Editar Venda</h1>
      <VendaForm venda={venda} onSubmit={onSubmit} handleDelete={handleDelete}/>
    </div>
  );
};

export { EditarVenda as default };
