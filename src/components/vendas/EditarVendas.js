import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  startEditVenda,
  startRemoveVenda,
  startSetVendas,
} from '../../actions/vendas';
import VendaForm from './VendaForm';
import { StyledButton } from '../forms/elements';
import { ArrowBackIos } from '@material-ui/icons';

const EditarVenda = (props) => {
  const dispatch = useDispatch();
  const venda = useSelector((state) => {
    return state.vendas.find((venda) => venda.id === props.match.params.id);
  });

  // Will render component only with props
  const [haveProps, setHaveProps] = useState(false);
  useEffect(() => {
    if (venda) {
      setHaveProps(true);
    }
  }, [venda]);

  useEffect(() => {
    dispatch(startSetVendas());
    // eslint-disable-next-line
  }, []);

  const onSubmit = (data) => {
    dispatch(startEditVenda(venda.id, data)).then(() =>
      props.history.push(`/vendas`)
    );
  };

  const handleDelete = () => {
    dispatch(startRemoveVenda({ id: venda.id })).then(() => {
      props.history.push('/vendas');
    });
  };

  return (
    <div>
      <StyledButton.Link to="/vendas">
        <StyledButton.OnlyIcon>
          <ArrowBackIos />
        </StyledButton.OnlyIcon>
      </StyledButton.Link>
      <h1>Editar Venda</h1>
      {haveProps && (
        <VendaForm
          venda={venda}
          onSubmit={onSubmit}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export { EditarVenda as default };
