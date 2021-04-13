import { database } from '../database/firebase';

//ADD_EXPENSE

export const addVenda = (venda) => ({
  type: 'ADD_VENDA',
  venda,
});

export const startAddVenda = (vendaData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      numero = '',
      cliente = '',
      produtos = [],
      subTotal = '',
      total = '',
      frete = '',
      desconto = '',
      observacoes = '',
      status = '',
      dataVenda = '',
    } = vendaData;
    const venda = {
      numero,
      cliente,
      produtos,
      subTotal,
      total,
      frete,
      desconto,
      observacoes,
      status,
      dataVenda,
    };
    database
      .ref(`users/${uid}/vendas`)
      .push(vendaData)
      .then((ref) => {
        dispatch(
          addVenda({
            id: ref.key,
            ...venda,
          })
        );
      });
  };
};

//REMOVE_EXPENSE

export const removeVenda = (id) => ({
  type: 'REMOVER_VENDA',
  venda: {
    id,
  },
});

export const startRemoveVenda = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/vendas/${id}`)
      .remove()
      .then(() => {
        dispatch(removeVenda(id));
      });
  };
};

//EDIT_EXPENSE

export const editVenda = (id, updates) => ({
  type: 'EDITAR_VENDA',
  id,
  updates,
});

export const startEditVenda = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/vendas/${id}`)
      .update(updates)
      .then(() => {
        dispatch(editVenda(id, updates));
      });
  };
};

// SET_EXPENSES
export const setVendas = (vendas) => ({
  type: 'SET_VENDAS',
  vendas,
});

export const startSetVendas = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    return database
      .ref(`users/${uid}/vendas`)
      .once('value')
      .then((snapshot) => {
        const vendas = [];

        snapshot.forEach((childSnapshot) => {
          vendas.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });
        dispatch(setVendas(vendas));
      });
  };
};
