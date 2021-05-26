import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  addProduto,
  startAddProduto,
  editProduto,
  startEditProduto,
  removeProduto,
  startRemoveProduto,
  setProdutos,
  startSetProdutos,
} from '../../actions/produtos';
import { database } from '../../database/firebase';

const createMockStore = configureMockStore([thunk]);

const produtoObject = {
  nome: 'Purse',
  unidade: 'Un',
  peso: 1000,
  valorCusto: 1250,
  status: 'ativo',
  valorVenda: 2000,
  fornecedor: 'Jorgeclayvson',
};

it('should setup add product action object', () => {
  const result = addProduto(produtoObject);
  expect(result).toEqual({
    type: 'ADD_PRODUTO',
    produto: {
      ...produtoObject,
    },
  });
});

it('should setup edit product action object', () => {
  const result = editProduto('123abc', { nome: 'Bag' });
  expect(result).toEqual({
    type: 'EDITAR_PRODUTO',
    id: '123abc',
    updates: {
      nome: 'Bag',
    },
  });
});

it('should setup remove product action object', () => {
  const result = removeProduto('123abc');
  expect(result).toEqual({
    type: 'REMOVER_PRODUTO',
    produto: { id: '123abc' },
  });
});

it('should setup products action object', () => {
  const result = setProdutos([produtoObject]);
  expect(result).toEqual({ type: 'SET_PRODUTOS', produtos: [produtoObject] });
});

const store = createMockStore({});
const userID = '123abc';
let productID;

beforeEach(() => {
  store.clearActions();
});

it('should add product to store', () => {
  return store.dispatch(startAddProduto(produtoObject, userID)).then(() => {
    const state = store.getActions();
    productID = state[0].produto.id;
    expect(state[0]).toEqual({
      type: 'ADD_PRODUTO',
      produto: {
        id: expect.any(String),
        ...produtoObject,
      },
    });
  });
});

it('should added product be on database', () => {
  return database
    .ref(`users/${userID}/produtos/${productID}`)
    .once('value')
    .then((snap) => {
      expect(snap.val()).toEqual(produtoObject);
    });
});

it('should edit product on store', () => {
  return store
    .dispatch(startEditProduto(productID, { nome: 'Bag' }, userID))
    .then(() => {
      const state = store.getActions();
      expect(state[0]).toEqual({
        id: expect.any(String),
        type: 'EDITAR_PRODUTO',
        updates: {
          nome: 'Bag',
        },
      });
    });
});

it('should edited product be on database', () => {
  return database
    .ref(`users/${userID}/produtos/${productID}`)
    .once('value')
    .then((snap) => {
      expect(snap.val()).toEqual({
        ...produtoObject,
        nome: 'Bag',
      });
    });
});

it('should set products from database to store', () => {
  return store.dispatch(startSetProdutos(userID)).then(() => {
    const state = store.getActions();
    expect(state[0]).toEqual({
      type: 'SET_PRODUTOS',
      produtos: [
        {
          ...produtoObject,
          nome: 'Bag',
          id: productID,
        },
      ],
    });
  });
});

it('should remove product from store', () => {
  return store
    .dispatch(startRemoveProduto({ id: productID, userID }))
    .then(() => {
      const state = store.getActions();
      expect(state[0]).toEqual({
        type: 'REMOVER_PRODUTO',
        produto: {
          id: expect.any(String),
        },
      });
    });
});

it("shouldn't removed client be on database", () => {
  return database
    .ref(`users/${userID}/produtos/${productID}`)
    .once('value')
    .then((snap) => {
      expect(snap.val()).toEqual(null);
    });
});
