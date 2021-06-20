import React, { useEffect, useState } from 'react';
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
import { Modal } from '..';

const Vendas = (props) => {
  const [modal, setModal] = useState(false);
  const [idToRemove, setIdToRemove] = useState('');

  const dispatch = useDispatch();
  const vendas = useSelector((state) => selectVendas(state.vendas, state.filtrosVendas));

  useEffect(() => {
    dispatch(startSetVendas());
    // eslint-disable-next-line
  }, []);

  const handleDelete = () => {
    dispatch(startEditVenda(idToRemove, { status: 'Cancelada' })).then(() => {
      props.history.push(`/vendas`);
    });
  };

  const handleDeleteModal = (id) => {
    setModal(true);
    setIdToRemove(id);
  };

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
      Cell: (props) => getAcoes(props, handleDeleteModal, 'vendas'),
      disableSortBy: true,
    },
  ];

  return (
    <div>
      {modal && (
        <Modal
          title="Deseja realmente excluir?"
          description="A venda será marcada como cancelada e não aparecerá nos relatórios. É possível reverter esta ação."
          btnOutlined="Cancelar"
          btnOutlinedFunction={() => setModal(false)}
          btnSecondary="Excluir"
          btnSecondaryFunction={() => handleDelete()}
        ></Modal>
      )}
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
