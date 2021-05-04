import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FiltroProduto from './FiltroProduto';
import selectProdutos from '../../selectors/produtos';
import Add from '@material-ui/icons/Add';
import { startRemoveProduto, startSetProdutos } from '../../actions/produtos';
import { StyledButton } from '../forms/elements';
import Tabela from '../listas/Tabela';
import { Delete, Edit } from '@material-ui/icons';
import { useGetData, useGetStatus, useGetValorEmReal } from '../listas/utils';
import { Typography } from '@material-ui/core';

const Produto = (props) => {
  const produtos = useSelector((state) =>
    selectProdutos(state.produtos, state.filtrosProdutos)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startSetProdutos());
    // eslint-disable-next-line
  }, []);

  const handleDelete = useMemo(
    (id) => (id) => {
      dispatch(startRemoveProduto({ id })).then(() => {
        props.history.push('/produtos');
      });
    },
    [dispatch, props.history]
  );

  const getAcoes = useMemo(
    (props) => ({ row }) => {
      const id = row.original.id;

      return (
        <>
          <StyledButton.Link to={`/produtos/editar/${id}`}>
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
      accessor: 'nome',
      Header: 'Nome',
    },
    {
      accessor: 'createdAt',
      Header: 'Adicionado em',
      Cell: useGetData,
    },
    {
      accessor: 'valorVenda',
      Header: 'Valor de Venda',
      Cell: useGetValorEmReal,
    },
    { accessor: 'acoes', Header: 'Ações', Cell: getAcoes, disableSortBy: true },
  ];

  return (
    <div>
      <Typography variant="h1">Lista de Produtos</Typography>
      <StyledButton
        variant="contained"
        color="primary"
        startIcon={<Add />}
        component={Link}
        to="/produtos/novo"
      >
        Novo Produto
      </StyledButton>
      <FiltroProduto />
      <Tabela
        header={header}
        dataArray={produtos}
        columnSortedDefault={{ id: 'nome', desc: false }}
      />
    </div>
  );
};

export { Produto as default };
