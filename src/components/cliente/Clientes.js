import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import selectClientes from '../../selectors/clientes';
import { FiltroCliente, Modal } from '../../components';
import { StyledButton } from '../forms/elements';
import { Listagem, Tabela } from '../listas';
import { startRemoveCliente, startSetClientes } from '../../actions/clientes';
import { useGetStatus, useGetEndereco, getAcoes } from '../listas/utils';
import { Add } from '@material-ui/icons';

const Clientes = (props) => {
  const [modal, setModal] = useState(false);
  const [idToRemove, setIdToRemove] = useState('');

  const clientes = useSelector((state) =>
    selectClientes(state.clientes, state.filtrosClientes)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startSetClientes());
    // eslint-disable-next-line
  }, []);

  const handleDelete = (id) => {
    dispatch(startRemoveCliente({ id: idToRemove })).then(() => {
      props.history.push('/clientes');
      setModal(false);
    });
  };

  const handleDeleteModal = (id) => {
    setModal(true);
    setIdToRemove(id);
  };

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
      Cell: (props) => getAcoes(props, handleDeleteModal, 'clientes'),
      disableSortBy: true,
    },
  ];

  return (
    <Listagem>
      {modal && (
        <Modal
          title="Deseja realmente excluir?"
          description="Não é possível reverter esta ação."
          btnOutlined="Cancelar"
          btnOutlinedFunction={() => setModal(false)}
          btnSecondary="Excluir"
          btnSecondaryFunction={() => handleDelete()}
        ></Modal>
      )}
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
