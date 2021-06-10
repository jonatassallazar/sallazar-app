import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FiltroProduto from './FiltroProduto';
import selectProdutos from '../../selectors/produtos';
import Add from '@material-ui/icons/Add';
import { startRemoveProduto, startSetProdutos } from '../../actions/produtos';
import { StyledButton } from '../forms/elements';
import { Tabela, Listagem } from '../listas';
import { getAcoes, useGetData, useGetStatus, useGetValorEmReal } from '../listas/utils';

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
      Cell: (props) => getAcoes(props, handleDelete, 'produtos'),
      disableSortBy: true,
    },
  ];

  return (
    <div>
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
