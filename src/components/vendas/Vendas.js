import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FiltroVenda from './FiltroVenda';
import { startRemoveVenda, startSetVendas } from '../../actions/vendas';
import selectVendas from '../../selectors/vendas';
import { StyledButton } from '../forms/elements';
import { Add, Delete, Edit } from '@material-ui/icons';
import { Typography } from '@material-ui/core';
import { useGetCliente, useGetData, useGetStatus, useGetValorEmReal } from '../listas/utils';
import Tabela from '../listas/Tabela';

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
      dispatch(startRemoveVenda({ id })).then(() => {
        props.history.push('/vendas');
      });
    },
    [dispatch, props.history]
  );

  const getAcoes = useMemo(
    (props) => ({ row }) => {
      const id = row.original.id;

      return (
        <>
          <StyledButton.Link to={`/vendas/editar/${id}`}>
            <StyledButton.OnlyIcon className="primary">
              <Edit />
            </StyledButton.OnlyIcon>
          </StyledButton.Link>
          <StyledButton.OnlyIcon
            className="secondary"
            onClick={() => handleDelete(id)}
          >
            <Delete />
          </StyledButton.OnlyIcon>
        </>
      );
    },
    [handleDelete]
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
      { accessor: 'acoes', Header: 'Ações', Cell: getAcoes, disableSortBy: true },
    ];
    
  return (
    <div>
      <Typography variant="h1">Vendas Realizadas</Typography>
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
