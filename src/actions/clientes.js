import { database } from '../database/firebase';

//ADD_EXPENSE

export const addCliente = (cliente) => ({
  type: 'ADD_CLIENTE',
  cliente,
});

export const startAddCliente = (clienteData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      nome = '',
      telefone = '',
      email = 0,
      dataDeNascimento = 0,
      status = 'ativo',
      genero = '',
      selectedTags = [],
      enderecoCompleto = {
        CEP: '',
        endereco: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
      },
    } = clienteData;
    const cliente = {
      nome,
      telefone,
      email,
      dataDeNascimento,
      status,
      genero,
      selectedTags,
      enderecoCompleto,
    };
    return database
      .ref(`users/${uid}/clientes`)
      .push(clienteData)
      .then((ref) => {
        return dispatch(
          addCliente({
            id: ref.key,
            ...cliente,
          })
        );
      });
  };
};

//REMOVE_EXPENSE

export const removeCliente = (id) => ({
  type: 'REMOVER_CLIENTE',
  cliente: {
    id,
  },
});

export const startRemoveCliente = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/clientes/${id}`)
      .remove()
      .then(() => {
        dispatch(removeCliente(id));
      });
  };
};

//EDIT_EXPENSE

export const editCliente = (id, updates) => ({
  type: 'EDITAR_CLIENTE',
  id,
  updates,
});

export const startEditCliente = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/clientes/${id}`)
      .update(updates)
      .then(() => {
        dispatch(editCliente(id, updates));
      });
  };
};

// SET_EXPENSES
export const setClientes = (clientes) => ({
  type: 'SET_CLIENTES',
  clientes,
});

export const startSetClientes = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    return database
      .ref(`users/${uid}/clientes`)
      .once('value')
      .then((snapshot) => {
        const clientes = [];

        snapshot.forEach((childSnapshot) => {
          clientes.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });
        dispatch(setClientes(clientes));
      });
  };
};
