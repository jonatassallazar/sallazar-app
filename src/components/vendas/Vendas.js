import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FiltroVenda from './FiltroVenda';
import { startEditVenda, startSetVendas } from '../../actions/vendas';
import selectVendas from '../../selectors/vendas';
import { StyledButton } from '../forms/elements';
import { Add } from '@material-ui/icons';
import {
  getAcoes,
  useGetCliente,
  useGetData,
  useGetStatus,
  useGetValorEmReal,
} from '../listas/utils';
import { Tabela, Listagem } from '../listas';

const Vendas = (props) => {
  const dispatch = useDispatch();
  const vendas = useSelector((state) =>
    selectVendas(state.vendas, state.filtrosVendas)
  );

  useEffect(() => {
    dispatch(startSetVendas());
    // eslint-disable-next-line
  }, []);

  const handleDelete = useMemo(
    (id) => (id) => {
      dispatch(startEditVenda(id, { status: 'Cancelada' })).then(() =>
        props.history.push(`/vendas`)
      );
    },
    [dispatch, props.history]
  );

  const header = [
    { accessor: 'status', Header: 'Status', Cell: useGetStatus },
    {
      accessor: 'numero',
      Header: 'Nº',
    },
    { accessor: 'cliente', Header: 'Cliente', Cell: useGetCliente },
    {
      accessor: 'dataVenda',
      Header: 'Data da Venda',
      Cell: useGetData,
    },
    { accessor: 'total', Header: 'Total', Cell: useGetValorEmReal },
    {
      accessor: 'acoes',
      Header: 'Ações',
      Cell: (props) => getAcoes(props, handleDelete, 'vendas'),
      disableSortBy: true,
    },
  ];

  return (
    <div>
      <Listagem.Title>Vendas Realizadas</Listagem.Title>
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
      <Tabela
        header={header}
        dataArray={vendas}
        columnSortedDefault={{ id: 'numero', desc: true }}
      />
    </div>
  );
};

export { Vendas as default };
