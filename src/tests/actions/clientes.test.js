import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  addCliente,
  setClientes,
  editCliente,
  startEditCliente,
  removeCliente,
  startRemoveCliente,
  startAddCliente,
  startSetClientes,
} from '../../actions/clientes';
import { database } from '../../database/firebase';

const createMockStore = configureMockStore([thunk]);

const clientObject = {
  nome: 'Test Jr.',
  telefone: '1998277720',
  email: 'test@gmail.com',
  dataDeNascimento: 15151515178,
  status: 'ativo',
  genero: 'Male',
  selectedTags: ['Devedor'],
  enderecoCompleto: {
    CEP: '13255-555',
    endereco: 'asd',
    numero: '123',
    complemento: 'asd',
    bairro: 'ssd',
    cidade: 'ccd',
    estado: 'SP',
  },
};

it('should setup add client action object', () => {
  const result = addCliente(clientObject);
  expect(result).toEqual({
    type: 'ADD_CLIENTE',
    cliente: {
      ...clientObject,
    },
  });
});

it('should setup edit client action object', () => {
  const result = editCliente('123abc', { nome: 'Tester Father' });
  expect(result).toEqual({
    type: 'EDITAR_CLIENTE',
    id: '123abc',
    updates: {
      nome: 'Tester Father',
    },
  });
});

it('should setup remove client action object', () => {
  const result = removeCliente('123abc');
  expect(result).toEqual({
    type: 'REMOVER_CLIENTE',
    cliente: { id: '123abc' },
  });
});

it('should setup clients action object', () => {
  const result = setClientes([clientObject]);
  expect(result).toEqual({ type: 'SET_CLIENTES', clientes: [clientObject] });
});

const store = createMockStore({});
const userID = '123abc';
let clientID;

beforeEach(() => {
  store.clearActions();
});

it('should add client to store', () => {
  return store.dispatch(startAddCliente(clientObject, userID)).then(() => {
    const state = store.getActions();
    clientID = state[0].cliente.id;
    expect(state[0]).toEqual({
      type: 'ADD_CLIENTE',
      cliente: {
        id: expect.any(String),
        ...clientObject,
      },
    });
  });
});

it('should new client be on database', () => {
  return database
    .ref(`users/${userID}/clientes/${clientID}`)
    .once('value')
    .then((snap) => {
      expect(snap.val()).toEqual(clientObject);
    });
});

it('should edit client on store', () => {
  return store
    .dispatch(startEditCliente(clientID, { nome: 'Tester Father' }, userID))
    .then(() => {
      const state = store.getActions();
      expect(state[0]).toEqual({
        id: expect.any(String),
        type: 'EDITAR_CLIENTE',
        updates: {
          nome: 'Tester Father',
        },
      });
    });
});

it('should edited client be on database', () => {
  return database
    .ref(`users/${userID}/clientes/${clientID}`)
    .once('value')
    .then((snap) => {
      expect(snap.val()).toEqual({
        ...clientObject,
        nome: 'Tester Father',
      });
    });
});

it('should set clients from database to store', () => {
  return store.dispatch(startSetClientes(userID)).then(() => {
    const state = store.getActions();
    expect(state[0]).toEqual({
      type: 'SET_CLIENTES',
      clientes: [
        {
          ...clientObject,
          nome: 'Tester Father',
          id: clientID,
        },
      ],
    });
  });
});

it('should remove client from store', () => {
  return store
    .dispatch(startRemoveCliente({ id: clientID, userID }))
    .then(() => {
      const state = store.getActions();
      expect(state[0]).toEqual({
        type: 'REMOVER_CLIENTE',
        cliente: {
          id: expect.any(String),
        },
      });
    });
});

it("shouldn't removed client be on database", () => {
  return database
    .ref(`users/${userID}/clientes/${clientID}`)
    .once('value')
    .then((snap) => {
      expect(snap.val()).toEqual(null);
    });
});
