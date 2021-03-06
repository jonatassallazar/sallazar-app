import { database } from '../database/firebase';

//ADD_EXPENSE

export const addProduto = (produto) => ({
  type: 'ADD_PRODUTO',
  produto,
});

export const startAddProduto = (produtoData = {}, userID) => {
  return (dispatch, getState) => {
    const uid = userID || getState().auth.uid;
    const {
      nome = '',
      unidade = '',
      peso = 0,
      valorCusto = 0,
      valorVenda = '',
      fornecedor = '',
      status = '',
    } = produtoData;
    const produto = {
      nome,
      unidade,
      peso,
      valorCusto,
      status,
      valorVenda,
      fornecedor,
    };
    return database
      .ref(`users/${uid}/produtos`)
      .push(produtoData)
      .then((ref) => {
        return dispatch(
          addProduto({
            id: ref.key,
            ...produto,
          })
        );
      });
  };
};

//REMOVE_EXPENSE

export const removeProduto = (id) => ({
  type: 'REMOVER_PRODUTO',
  produto: {
    id,
  },
});

export const startRemoveProduto = ({ id, userID } = {}) => {
  return (dispatch, getState) => {
    const uid = userID || getState().auth.uid;
    return database
      .ref(`users/${uid}/produtos/${id}`)
      .remove()
      .then(() => {
        return dispatch(removeProduto(id));
      });
  };
};

//EDIT_EXPENSE

export const editProduto = (id, updates) => ({
  type: 'EDITAR_PRODUTO',
  id,
  updates,
});

export const startEditProduto = (id, updates, userID) => {
  return (dispatch, getState) => {
    const uid = userID || getState().auth.uid;
    return database
      .ref(`users/${uid}/produtos/${id}`)
      .update(updates)
      .then(() => {
        return dispatch(editProduto(id, updates));
      });
  };
};

// SET_EXPENSES
export const setProdutos = (produtos) => ({
  type: 'SET_PRODUTOS',
  produtos,
});

export const startSetProdutos = (userID) => {
  return (dispatch, getState) => {
    const uid = userID || getState().auth.uid;

    return database
      .ref(`users/${uid}/produtos`)
      .once('value')
      .then((snapshot) => {
        const produtos = [];
        snapshot.forEach((childSnapshot) => {
          produtos.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });
        return dispatch(setProdutos(produtos));
      });
  };
};
