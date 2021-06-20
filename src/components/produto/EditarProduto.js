import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  startEditProduto,
  startRemoveProduto,
  startSetProdutos,
} from '../../actions/produtos';
import ProdutoForm from './ProdutoForm';
import { StyledButton } from '../forms/elements';
import { ArrowBackIos } from '@material-ui/icons';
import { Modal } from '..';

const EditarProduto = (props) => {
  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startSetProdutos());
    // eslint-disable-next-line
  }, []);

  const produto = useSelector((state) => {
    return state.produtos.find((produto) => produto.id === props.match.params.id);
  });

  // Will render component only with props
  const [haveProps, setHaveProps] = useState(false);
  useEffect(() => {
    if (produto) {
      setHaveProps(true);
    }
  }, [produto]);

  const onSubmit = (data) => {
    dispatch(startEditProduto(produto.id, data)).then(() =>
      props.history.push(`/produtos`)
    );
  };

  const handleDelete = () => {
    dispatch(startRemoveProduto({ id: produto.id })).then(() => {
      props.history.push('/produtos');
      setModal(false);
    });
  };

  const handleDeleteModal = () => {
    setModal(true);
  };

  return (
    <div>
      {modal && (
        <Modal
          title="Deseja realmente excluir?"
          description="Esta ação não terá como desfazer."
          btnOutlined="Cancelar"
          btnOutlinedFunction={() => setModal(false)}
          btnSecondary="Excluir"
          btnSecondaryFunction={() => handleDelete()}
        ></Modal>
      )}
      <StyledButton.Link to="/produtos">
        <StyledButton.OnlyIcon>
          <ArrowBackIos />
        </StyledButton.OnlyIcon>
      </StyledButton.Link>
      <h1>Editar Produto</h1>
      {haveProps && (
        <ProdutoForm
          produto={produto}
          onSubmit={onSubmit}
          handleDelete={handleDeleteModal}
        />
      )}
    </div>
  );
};

export { EditarProduto as default };
