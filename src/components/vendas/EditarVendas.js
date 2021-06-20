import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startEditVenda, startSetVendas } from '../../actions/vendas';
import VendaForm from './VendaForm';
import { StyledButton } from '../forms/elements';
import { ArrowBackIos } from '@material-ui/icons';
import { Modal } from '..';

const EditarVenda = (props) => {
  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();
  const venda = useSelector((state) => {
    return state.vendas.find((venda) => venda.id === props.match.params.id);
  });

  // Will render component only with props
  const [haveProps, setHaveProps] = useState(false);
  useEffect(() => {
    if (venda) {
      setHaveProps(true);
    }
  }, [venda]);

  useEffect(() => {
    dispatch(startSetVendas());
    // eslint-disable-next-line
  }, []);

  const onSubmit = (data) => {
    dispatch(startEditVenda(venda.id, data)).then(() => props.history.push(`/vendas`));
  };

  const handleDelete = () => {
    const id = venda.id;
    dispatch(startEditVenda(id, { status: 'Cancelada' })).then(() => {
      props.history.push('/vendas');
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
          description="A venda será marcada como cancelada e não aparecerá nos relatórios. É possível reverter esta ação."
          btnOutlined="Cancelar"
          btnOutlinedFunction={() => setModal(false)}
          btnSecondary="Excluir"
          btnSecondaryFunction={() => handleDelete()}
        ></Modal>
      )}
      <StyledButton.Link to="/vendas">
        <StyledButton.OnlyIcon>
          <ArrowBackIos />
        </StyledButton.OnlyIcon>
      </StyledButton.Link>
      <h1>Editar Venda</h1>
      {haveProps && (
        <VendaForm venda={venda} onSubmit={onSubmit} handleDelete={handleDeleteModal} />
      )}
    </div>
  );
};

export { EditarVenda as default };
