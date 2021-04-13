import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FiltroVenda from './FiltroVenda';
import VendaItem from './VendaItem';
import selectVendas from '../../selectors/vendas';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import { startSetVendas } from '../../actions/vendas';

const Vendas = () => {
  const selection = useSelector((state) =>
    selectVendas(state.vendas, state.filtrosVendas)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startSetVendas());
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1>Vendas</h1>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        component={Link}
        to="/vendas/novo"
      >
        Nova Venda
      </Button>
      <FiltroVenda />
      <div className="lista-itens-janela">
        {selection.map((venda) => (
          <VendaItem key={venda.id} {...venda} />
        ))}
      </div>
    </div>
  );
};

export { Vendas as default };
