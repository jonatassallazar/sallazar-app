import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FiltroProduto from './FiltroProduto';
import selectProdutos from '../../selectors/produtos';
import Add from '@material-ui/icons/Add';
import { startRemoveProduto, startSetProdutos } from '../../actions/produtos';
import { StyledButton } from '../forms/elements';
import { Tabela, Listagem } from '../listas';
import { getAcoes, useGetData, useGetStatus, useGetValorEmReal } from '../listas/utils';
import { Modal } from '..';

const Produto = (props) => {
  const [modal, setModal] = useState(false);
  const [idToRemove, setIdToRemove] = useState('');

  const produtos = useSelector((state) =>
    selectProdutos(state.produtos, state.filtrosProdutos)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startSetProdutos());
    // eslint-disable-next-line
  }, []);

  const handleDelete = () => {
    dispatch(startRemoveProduto({ id: idToRemove })).then(() => {
      props.history.push('/produtos');
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
      accessor: 'createdAt',
      Header: 'Adicionado em',
      Cell: useGetData,
    },
    {
      accessor: 'valorCusto',
      Header: 'Valor de Custo',
      Cell: useGetValorEmReal,
    },
    {
      accessor: 'valorVenda',
      Header: 'Valor de Venda',
      Cell: useGetValorEmReal,
    },
    {
      accessor: 'acoes',
      Header: 'Ações',
      Cell: (props) => getAcoes(props, handleDeleteModal, 'produtos'),
      disableSortBy: true,
    },
  ];

  return (
    <div>
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
      <Listagem.Title>Lista de Produtos</Listagem.Title>
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
