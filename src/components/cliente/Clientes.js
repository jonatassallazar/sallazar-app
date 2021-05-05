import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import selectClientes from '../../selectors/clientes';
import { FiltroCliente } from '../../components';
import { StyledButton } from '../forms/elements';
import { Listagem, Tabela } from '../listas';
import { startRemoveCliente, startSetClientes } from '../../actions/clientes';
import { useGetStatus, useGetEndereco } from '../listas/utils';
import { Delete, Edit, Add } from '@material-ui/icons';
import { Typography } from '@material-ui/core';

const Clientes = (props) => {
  const clientes = useSelector((state) =>
    selectClientes(state.clientes, state.filtrosClientes)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startSetClientes());
    // eslint-disable-next-line
  }, []);

  const handleDelete = useMemo(
    (id) => (id) => {
      dispatch(startRemoveCliente({ id })).then(() => {
        props.history.push('/clientes');
      });
    },
    [dispatch, props.history]
  );

  const getAcoes = useMemo(
    (props) => ({ row }) => {
      const id = row.original.id;

      return (
        <>
          <StyledButton.Link to={`/clientes/editar/${id}`}>
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
      accessor: 'telefone',
      Header: 'Telefone',
    },
    { accessor: 'email', Header: 'Email' },
    { accessor: 'enderecoCompleto', Header: 'Endereço', Cell: useGetEndereco },
    { accessor: 'acoes', Header: 'Ações', Cell: getAcoes, disableSortBy: true },
  ];

  return (
    <Listagem>
      <Typography variant="h1">Lista de Clientes</Typography>
      <StyledButton
        variant="contained"
        color="primary"
        startIcon={<Add />}
        component={Link}
        to="/clientes/novo"
      >
        Novo Cliente
      </StyledButton>
      <FiltroCliente />
      <Tabela
        header={header}
        dataArray={clientes}
        columnSortedDefault={{ id: 'nome', desc: false }}
      />
    </Listagem>
  );
};

export { Clientes as default };
