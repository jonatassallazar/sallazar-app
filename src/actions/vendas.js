import { database } from '../database/firebase';

//ADD_EXPENSE

export const addVenda = (venda) => ({
  type: 'ADD_VENDA',
  venda,
});

export const startAddVenda = (vendaData = {}, userID) => {
  return (dispatch, getState) => {
    const uid = userID || getState().auth.uid;
    const {
      numero = '',
      cliente = {},
      itensVendidos = [],
      subTotal = '',
      total = '',
      frete = '',
      desconto = '',
      taxa = '',
      observacoes = '',
      status = '',
      parcelas = 1,
      pagamento = [],
      formaPagamento = '',
      dataVenda = '',
    } = vendaData;
    const venda = {
      numero,
      cliente,
      itensVendidos,
      subTotal,
      total,
      frete,
      desconto,
      taxa,
      observacoes,
      status,
      pagamento,
      parcelas,
      formaPagamento,
      dataVenda,
    };
    return database
      .ref(`users/${uid}/vendas`)
      .push(vendaData)
      .then((ref) => {
        return dispatch(
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

export const startRemoveVenda = ({ id, userID } = {}) => {
  return (dispatch, getState) => {
    const uid = userID || getState().auth.uid;
    return database
      .ref(`users/${uid}/vendas/${id}`)
      .remove()
      .then(() => {
        return dispatch(removeVenda(id));
      });
  };
};

//EDIT_EXPENSE

export const editVenda = (id, updates) => ({
  type: 'EDITAR_VENDA',
  id,
  updates,
});

export const startEditVenda = (id, updates, userID) => {
  return (dispatch, getState) => {
    const uid = userID || getState().auth.uid;
    return database
      .ref(`users/${uid}/vendas/${id}`)
      .update(updates)
      .then(() => {
        return dispatch(editVenda(id, updates));
      });
  };
};

// SET_EXPENSES
export const setVendas = (vendas) => ({
  type: 'SET_VENDAS',
  vendas,
});

export const startSetVendas = (userID) => {
  return (dispatch, getState) => {
    const uid = userID || getState().auth.uid;

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
        return dispatch(setVendas(vendas));
      });
  };
};
