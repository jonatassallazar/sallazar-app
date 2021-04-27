import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FiltroVenda from './FiltroVenda';
import VendaItem from './VendaItem';
import ListaItens from '../listas/ListaItens';
import { startSetVendas } from '../../actions/vendas';
import selectVendas from '../../selectors/vendas';
import { StyledButton } from '../forms/elements';
import Add from '@material-ui/icons/Add';

const Vendas = () => {
  const dispatch = useDispatch();
  const vendas = useSelector((state) =>
    selectVendas(state.vendas, state.filtrosVendas)
  );

  useEffect(() => {
    dispatch(startSetVendas());
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1>Vendas Realizadas</h1>
      <StyledButton
        variant="contained"
        color="primary"
        startIcon={<Add />}
        component={Link}
        to="/vendas/novo"
      >
        Nova Venda
      </StyledButton>
      <FiltroVenda />
      <ListaItens>
        <ListaItens.Header>
        <h6>Status</h6>
        <h6>Nº</h6>
        <h6>Cliente</h6>
        <h6>Data</h6>
        <h6>Valor</h6>
        </ListaItens.Header>
        {vendas.map((venda) => (
          <VendaItem key={venda.id} {...venda} />
        ))}
      </ListaItens>
    </div>
  );
};

export { Vendas as default };
