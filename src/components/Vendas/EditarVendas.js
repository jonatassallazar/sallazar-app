import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  startEditVenda,
  startRemoveVenda,
  startSetVendas,
} from '../../actions/vendas';
import VendaForm from './VendaForm';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

const EditarVenda = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startSetVendas());
    // eslint-disable-next-line
  }, []);

  const venda = useSelector((state) => {
    return state.vendas.find((venda) => venda.id === props.match.params.id);
  });

  const onSubmit = (data) => {
    dispatch(startEditVenda(venda.id, data)).then(() =>
      props.history.push(`/vendas`)
    );
  };

  return (
    <div>
      <h1>Editar Venda</h1>
      <VendaForm venda={venda} onSubmit={onSubmit} />
      <Button
        variant="contained"
        color="secondary"
        startIcon={<DeleteIcon />}
        onClick={() => {
          dispatch(startRemoveVenda({ id: venda.id })).then(() => {
            props.history.push('/vendas');
          });
        }}
      >
        Remove
      </Button>
    </div>
  );
};

export { EditarVenda as default };
