import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FiltroVenda from './FiltroVenda';
import VendaItem from './VendaItem';
import selectVendas from '../../selectors/vendas';
import Add from '@material-ui/icons/Add';
import { startSetVendas } from '../../actions/vendas';
import ListaItens from '../listas/ListaItens';
import { StyledButton } from '../forms/elements';

const Vendas = () => {
  const dispatch = useDispatch();
  const vendas = useSelector((state) =>
    selectVendas(state.vendas, state.filtrosVendas)
  );

  console.log(vendas);
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
        {vendas.map((venda) => (
          <VendaItem key={venda.id} {...venda} />
        ))}
      </ListaItens>
    </div>
  );
};

export { Vendas as default };
