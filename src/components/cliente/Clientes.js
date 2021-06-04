import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import selectClientes from '../../selectors/clientes';
import { FiltroCliente } from '../../components';
import { StyledButton } from '../forms/elements';
import { Listagem, Tabela } from '../listas';
import { startRemoveCliente, startSetClientes } from '../../actions/clientes';
import { useGetStatus, useGetEndereco, getAcoes } from '../listas/utils';
import { Add } from '@material-ui/icons';

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
    {
      accessor: 'acoes',
      Header: 'Ações',
      Cell: (props) => getAcoes(props, handleDelete, 'clientes'),
      disableSortBy: true,
    },
  ];

  return (
    <Listagem>
      <Listagem.Title>Lista de Clientes</Listagem.Title>
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
