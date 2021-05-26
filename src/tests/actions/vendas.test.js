import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  addVenda,
  startAddVenda,
  editVenda,
  startEditVenda,
  removeVenda,
  startRemoveVenda,
  setVendas,
  startSetVendas,
} from '../../actions/vendas';
import { database } from '../../database/firebase';

const createMockStore = configureMockStore([thunk]);

const vendaObject = {
  numero: '0001',
      cliente: [{id: '123abc', nome: 'Jr.'}],
      itensVendidos: [{ id: '456def', nome: 'bag'}],
      subTotal: 1200,
      total: 1500,
      frete: 300,
      desconto: 0,
      taxa:0,
      observacoes: 'nothing',
      status: 'em andamento',
      pagamento: [{ valorParcela: 1500, dataParcela: 1231214513}],
      parcelas: 1,
      formaPagamento: 'avista',
      dataVenda: 1232345324,
};

it('should setup add venda action object', () => {
  const result = addVenda(vendaObject);
  expect(result).toEqual({
    type: 'ADD_VENDA',
    venda: {
      ...vendaObject,
    },
  });
});

it('should setup edit venda action object', () => {
  const result = editVenda('123abc', { nome: 'Bag' });
  expect(result).toEqual({
    type: 'EDITAR_VENDA',
    id: '123abc',
    updates: {
      nome: 'Bag',
    },
  });
});

it('should setup remove venda action object', () => {
  const result = removeVenda('123abc');
  expect(result).toEqual({
    type: 'REMOVER_VENDA',
    venda: { id: '123abc' },
  });
});

it('should setup vendas action object', () => {
  const result = setVendas([vendaObject]);
  expect(result).toEqual({ type: 'SET_VENDAS', vendas: [vendaObject] });
});

const store = createMockStore({});
const userID = '123abc';
let vendaID;

beforeEach(() => {
  store.clearActions();
});

it('should add venda to store', () => {
  return store.dispatch(startAddVenda(vendaObject, userID)).then(() => {
    const state = store.getActions();
    vendaID = state[0].venda.id;
    expect(state[0]).toEqual({
      type: 'ADD_VENDA',
      venda: {
        id: expect.any(String),
        ...vendaObject,
      },
    });
  });
});

it('should added venda be on database', () => {
  return database
    .ref(`users/${userID}/vendas/${vendaID}`)
    .once('value')
    .then((snap) => {
      expect(snap.val()).toEqual(vendaObject);
    });
});

it('should edit venda on store', () => {
  return store
    .dispatch(startEditVenda(vendaID, { nome: 'Bag' }, userID))
    .then(() => {
      const state = store.getActions();
      expect(state[0]).toEqual({
        id: expect.any(String),
        type: 'EDITAR_VENDA',
        updates: {
          nome: 'Bag',
        },
      });
    });
});

it('should edited venda be on database', () => {
  return database
    .ref(`users/${userID}/vendas/${vendaID}`)
    .once('value')
    .then((snap) => {
      expect(snap.val()).toEqual({
        ...vendaObject,
        nome: 'Bag',
      });
    });
});

it('should set vendas from database to store', () => {
  return store.dispatch(startSetVendas(userID)).then(() => {
    const state = store.getActions();
    expect(state[0]).toEqual({
      type: 'SET_VENDAS',
      vendas: [
        {
          ...vendaObject,
          nome: 'Bag',
          id: vendaID,
        },
      ],
    });
  });
});

it('should remove venda from store', () => {
  return store
    .dispatch(startRemoveVenda({ id: vendaID, userID }))
    .then(() => {
      const state = store.getActions();
      expect(state[0]).toEqual({
        type: 'REMOVER_VENDA',
        venda: {
          id: expect.any(String),
        },
      });
    });
});

it("shouldn't removed client be on database", () => {
  return database
    .ref(`users/${userID}/vendas/${vendaID}`)
    .once('value')
    .then((snap) => {
      expect(snap.val()).toEqual(null);
    });
});
