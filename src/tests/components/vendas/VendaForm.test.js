import {
  render,
  fireEvent,
  screen,
  waitForElementToBeRemoved,
} from '../../utils/render';
import userEvent from '@testing-library/user-event';
import * as redux from 'react-redux';
import { VendaForm } from '../../../components';
import moment from 'moment';
import clientes from '../../fixtures/clientes';
import produtos from '../../fixtures/produtos';
import vendas from '../../fixtures/vendas';

const initialState = {
  clientes,
  produtos,
  vendas,
};

const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
let mockDispatchFn = jest.fn(() => Promise.resolve());

beforeEach(() => {
  jest.useFakeTimers('modern');
  jest.setSystemTime(new Date(0));
  mockDispatchFn = jest.fn(() => Promise.resolve());
  useDispatchSpy.mockReturnValue(mockDispatchFn);
});

afterAll(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
  useDispatchSpy.mockClear();
});

it('should have a sale number disabled field', () => {
  render(<VendaForm />, { initialState });

  expect(screen.getByTestId('numero-venda')).toBeInTheDocument();
  expect(
    screen.getByTestId('numero-venda').childNodes[1].childNodes[0]
  ).toBeDisabled();
});

it('should have a status select field', () => {
  render(<VendaForm />, { initialState });

  expect(screen.getByTestId('status')).toBeInTheDocument();
});

it('should have a sale date picker field', () => {
  render(<VendaForm />, { initialState });

  expect(screen.getByTestId('data-venda')).toBeInTheDocument();
  expect(
    screen.getByTestId('data-venda').childNodes[1].childNodes[0]
  ).toHaveValue('31/12/1969');
});

it('should have a client select field', () => {
  render(<VendaForm />, { initialState });

  expect(screen.getByTestId('cliente')).toBeInTheDocument();
});

it('should have a product select field', () => {
  render(<VendaForm />, { initialState });

  expect(screen.getByTestId('produto')).toBeInTheDocument();
});

it('should have a type of unit field', () => {
  render(<VendaForm />, { initialState });

  expect(screen.getByTestId('unidade')).toBeInTheDocument();
});

it('should have quantity value for each product field', () => {
  render(<VendaForm />, { initialState });

  expect(screen.getByTestId('quantidade')).toBeInTheDocument();
});

it('should have an unit value for each product field', () => {
  render(<VendaForm />, { initialState });

  expect(screen.getByTestId('valor-unitario')).toBeInTheDocument();
});

it('should have a total value for each product field', () => {
  render(<VendaForm />, { initialState });

  expect(screen.getByTestId('valor-total')).toBeInTheDocument();
});

it('should have a add new item button', () => {
  render(<VendaForm />, { initialState });

  expect(screen.getByTestId('add-new-item')).toBeInTheDocument();
});

it('should have a subtotal field', () => {
  render(<VendaForm />, { initialState });

  expect(screen.getByTestId('subtotal')).toBeInTheDocument();
});

it('should have a frete field', () => {
  render(<VendaForm />, { initialState });

  expect(screen.getByTestId('frete')).toBeInTheDocument();
});

it('should have a discount field', () => {
  render(<VendaForm />, { initialState });

  expect(screen.getByTestId('desconto')).toBeInTheDocument();
});

it('should have a fee field', () => {
  render(<VendaForm />, { initialState });

  expect(screen.getByTestId('taxa')).toBeInTheDocument();
});

it('should have a total field', () => {
  render(<VendaForm />, { initialState });

  expect(screen.getByTestId('total')).toBeInTheDocument();
});

it('should have a way of paymente select field', () => {
  render(<VendaForm />, { initialState });

  expect(screen.getByTestId('forma-pagamento')).toBeInTheDocument();
});

it('should have a number of parcelas field', () => {
  render(<VendaForm />, { initialState });

  expect(screen.getByTestId('parcelas')).toBeInTheDocument();
});

it('should have a id of parcela field', () => {
  render(<VendaForm />, { initialState });

  expect(screen.getByTestId('numero-parcela')).toBeInTheDocument();
});

it('should have a value for each parcela field', () => {
  render(<VendaForm />, { initialState });

  expect(screen.getByTestId('valor-parcela')).toBeInTheDocument();
});

it('should have a date for each parcela field', () => {
  render(<VendaForm />, { initialState });

  expect(screen.getByTestId('data-parcela')).toBeInTheDocument();
});

it('should have an additional information field', () => {
  render(<VendaForm />, { initialState });

  expect(screen.getByTestId('observacoes')).toBeInTheDocument();
});

it('should have a save button', () => {
  render(<VendaForm />, { initialState });

  expect(screen.getByTestId('save-button-venda')).toBeInTheDocument();
});

it('should have a delete button only with props', () => {
  render(<VendaForm />, { initialState });

  expect(screen.queryByTestId('delete-button-venda')).not.toBeInTheDocument();

  render(<VendaForm handleDelete={jest.fn()} />);

  expect(screen.getByTestId('delete-button-venda')).toBeInTheDocument();
});

it('should NOT fire onSubmit and should be displayed an error message', () => {
  const onSubmit = jest.fn();

  render(<VendaForm onSubmit={onSubmit} />);

  fireEvent.click(screen.getByTestId('save-button-venda'));

  expect(
    screen.getByText('Preencha todas as informações obrigatórias')
  ).toBeInTheDocument();
  expect(onSubmit).not.toHaveBeenCalled();
});

it('should call onSubmit when saving with necessary information', () => {
  const onSubmit = jest.fn();

  render(<VendaForm onSubmit={onSubmit} />, { initialState });

  const clientAutocomplete =
    screen.getByTestId('cliente').childNodes[0].childNodes[1].childNodes[0];

  const productAutocomplete =
    screen.getByTestId('produto').childNodes[0].childNodes[1].childNodes[0];

  clientAutocomplete.focus();
  fireEvent.change(document.activeElement, { target: { value: 'test' } });
  fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
  fireEvent.keyDown(document.activeElement, { key: 'Enter' });
  document.activeElement.blur();
  expect(clientAutocomplete.value).toEqual('Test Jr.');

  productAutocomplete.focus();
  fireEvent.change(document.activeElement, { target: { value: 'pur' } });
  fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
  fireEvent.keyDown(document.activeElement, { key: 'Enter' });
  document.activeElement.blur();
  expect(productAutocomplete.value).toEqual('Purse');

  fireEvent.click(screen.getByTestId('save-button-venda'));

  expect(onSubmit).toHaveBeenCalled();
  expect(
    screen.queryByText('Preencha todas as informações obrigatórias')
  ).not.toBeInTheDocument();
});

it('should call onSubmit with full data object', () => {
  const onSubmit = jest.fn();

  render(<VendaForm onSubmit={onSubmit} numero="00003" />, { initialState });

  fireEvent.change(screen.getByTestId('status').childNodes[1], {
    target: { value: 'orcamento' },
  });

  const campoDataVenda =
    screen.getByTestId('data-venda').childNodes[1].childNodes[0];
  userEvent.clear(campoDataVenda);
  userEvent.type(campoDataVenda, '21012019');
  expect(campoDataVenda).toHaveValue('21/01/2019');

  //Seleção de um cliente -------------------------------------------------------
  const clientAutocomplete =
    screen.getByTestId('cliente').childNodes[0].childNodes[1].childNodes[0];

  clientAutocomplete.focus();
  fireEvent.change(document.activeElement, { target: { value: 'test' } });
  fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
  fireEvent.keyDown(document.activeElement, { key: 'Enter' });
  document.activeElement.blur();
  expect(clientAutocomplete.value).toEqual('Test Jr.');
  // ----------------------------------------------------------------------------

  //Seleção de um Produto -------------------------------------------------------
  const productAutocomplete =
    screen.getByTestId('produto').childNodes[0].childNodes[1].childNodes[0];

  productAutocomplete.focus();
  fireEvent.change(document.activeElement, { target: { value: 'ba' } });
  fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
  fireEvent.keyDown(document.activeElement, { key: 'Enter' });
  document.activeElement.blur();
  expect(productAutocomplete.value).toEqual('Bag');
  // ----------------------------------------------------------------------------

  fireEvent.change(
    screen.getByTestId('quantidade').childNodes[1].childNodes[0],
    { target: { value: 2 } }
  );

  fireEvent.change(
    screen.getByTestId('valor-unitario').childNodes[1].childNodes[1],
    { target: { value: 1000 } }
  );

  fireEvent.change(screen.getByTestId('frete').childNodes[1].childNodes[1], {
    target: { value: 250 },
  });

  fireEvent.change(screen.getByTestId('desconto').childNodes[1].childNodes[1], {
    target: { value: 125 },
  });

  fireEvent.change(screen.getByTestId('taxa').childNodes[1].childNodes[1], {
    target: { value: 125 },
  });

  fireEvent.change(screen.getByTestId('forma-pagamento').childNodes[1], {
    target: { value: 'avista' },
  });

  fireEvent.change(screen.getByTestId('parcelas').childNodes[1].childNodes[0], {
    target: { value: 1 },
  });

  const campoDataParcela =
    screen.getByTestId('data-parcela').childNodes[1].childNodes[0];
  userEvent.clear(campoDataParcela);
  userEvent.type(campoDataParcela, '22012019');
  expect(campoDataParcela).toHaveValue('22/01/2019');

  fireEvent.change(
    screen.getByTestId('observacoes').childNodes[1].childNodes[0],
    { target: { value: 'Nothing at all' } }
  );

  fireEvent.click(screen.getByTestId('save-button-venda'));

  expect(
    screen.queryByText('Preencha todas as informações obrigatórias')
  ).not.toBeInTheDocument();
  expect(onSubmit).toHaveBeenCalledWith({
    numero: '00003',
    cliente: { id: '123abc', nome: 'Test Jr.' },
    itensVendidos: [
      {
        id: '456def',
        nome: 'Bag',
        unidade: 'Un',
        quantidade: '2',
        valorVenda: 1000,
        valorTotal: 2000,
      },
    ],
    dataVenda: moment('2019-01-21').valueOf(),
    status: 'orcamento',
    observacoes: 'Nothing at all',
    subTotal: 2000,
    total: 2000,
    taxa: 125,
    desconto: 125,
    frete: 250,
    parcelas: 1,
    pagamento: [
      {
        numeroParcela: 1,
        valorParcela: 2000,
        dataParcela: moment('2019-01-22').valueOf(),
        inseridoManualmente: false,
      },
    ],
    formaPagamento: 'avista',
    createdAt: 0,
  });
});

const saleObject = {
  numero: '00003',
  cliente: { id: '123abc', nome: 'Test Jr.' },
  itensVendidos: [
    {
      id: '456def',
      nome: 'Bag',
      unidade: 'Un',
      quantidade: '2',
      valorVenda: 1000,
      valorTotal: 2000,
    },
  ],
  dataVenda: moment('2019-01-21').valueOf(),
  status: 'orcamento',
  observacoes: 'Nothing at all',
  subTotal: 2000,
  total: 2000,
  taxa: 125,
  desconto: 125,
  frete: 250,
  parcelas: 1,
  pagamento: [
    {
      numeroParcela: 1,
      valorParcela: 2000,
      dataParcela: moment('2019-01-22').valueOf(),
      inseridoManualmente: false,
    },
  ],
  formaPagamento: 'avista',
  createdAt: 0,
};

it('should populate all fields with props', () => {
  const onSubmit = jest.fn();

  render(<VendaForm onSubmit={onSubmit} venda={saleObject} />);

  fireEvent.click(screen.getByTestId('save-button-venda'));

  expect(
    screen.queryByText('Preencha todas as informações obrigatórias')
  ).not.toBeInTheDocument();
  expect(onSubmit).toHaveBeenCalledWith(saleObject);
});

it('should dispatch delete function on click', () => {
  const handleDelete = jest.fn();

  render(<VendaForm handleDelete={handleDelete} />);

  fireEvent.click(screen.getByTestId('delete-button-venda'));

  expect(screen.getByTestId('delete-button-venda')).toBeInTheDocument();
  expect(handleDelete).toHaveBeenCalled();
});

it('should fire 2 dispatchs on load', () => {
  render(<VendaForm />, { initialState });

  expect(mockDispatchFn).toHaveBeenCalledTimes(2);
});

it('Should calculate the subTotal, reducing all itens on cart', () => {
  render(<VendaForm />, { initialState });

  //Seleção de um Produto -------------------------------------------------------
  const productAutocomplete =
    screen.getByTestId('produto').childNodes[0].childNodes[1].childNodes[0];

  productAutocomplete.focus();
  fireEvent.change(document.activeElement, { target: { value: 'ba' } });
  fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
  fireEvent.keyDown(document.activeElement, { key: 'Enter' });
  document.activeElement.blur();
  expect(productAutocomplete.value).toEqual('Bag');
  // ----------------------------------------------------------------------------

  //add new product
  fireEvent.click(screen.getByTestId('add-new-item'));

  //Seleção de um Produto -------------------------------------------------------
  const newProductAutocomplete =
    screen.getAllByTestId('produto')[1].childNodes[0].childNodes[1]
      .childNodes[0];

  newProductAutocomplete.focus();
  fireEvent.change(document.activeElement, { target: { value: 'pu' } });
  fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
  fireEvent.keyDown(document.activeElement, { key: 'Enter' });
  document.activeElement.blur();
  expect(newProductAutocomplete.value).toEqual('Purse');
  // ----------------------------------------------------------------------------

  expect(
    screen.getByTestId('subtotal').childNodes[1].childNodes[1]
  ).toHaveValue('70,00');
  expect(screen.getByTestId('total').childNodes[1].childNodes[1]).toHaveValue(
    '70,00'
  );
});

it('should calculate the total of the purchase', () => {
  render(<VendaForm />, { initialState });

  //Seleção de um Produto -------------------------------------------------------
  const productAutocomplete =
    screen.getByTestId('produto').childNodes[0].childNodes[1].childNodes[0];

  productAutocomplete.focus();
  fireEvent.change(document.activeElement, { target: { value: 'ba' } });
  fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
  fireEvent.keyDown(document.activeElement, { key: 'Enter' });
  document.activeElement.blur();
  expect(productAutocomplete.value).toEqual('Bag');
  // ----------------------------------------------------------------------------

  fireEvent.change(screen.getByTestId('frete').childNodes[1].childNodes[1], {
    target: { value: 500 },
  });

  fireEvent.change(screen.getByTestId('desconto').childNodes[1].childNodes[1], {
    target: { value: 200 },
  });

  fireEvent.change(screen.getByTestId('taxa').childNodes[1].childNodes[1], {
    target: { value: 100 },
  });

  expect(
    screen.getByTestId('subtotal').childNodes[1].childNodes[1]
  ).toHaveValue('50,00');
  expect(screen.getByTestId('total').childNodes[1].childNodes[1]).toHaveValue(
    '52,00'
  );
});

it('should have only one object in array of pagamento', () => {
  render(<VendaForm />, { initialState });

  //Seleção de um Produto -------------------------------------------------------
  const productAutocomplete =
    screen.getByTestId('produto').childNodes[0].childNodes[1].childNodes[0];

  productAutocomplete.focus();
  fireEvent.change(document.activeElement, { target: { value: 'ba' } });
  fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
  fireEvent.keyDown(document.activeElement, { key: 'Enter' });
  document.activeElement.blur();
  expect(productAutocomplete.value).toEqual('Bag');
  // ----------------------------------------------------------------------------

  expect(
    screen.getByTestId('numero-parcela').childNodes[1].childNodes[0]
  ).toHaveValue('1');
  expect(
    screen.getByTestId('valor-parcela').childNodes[1].childNodes[1]
  ).toHaveValue('50,00');
  expect(
    screen.getByTestId('data-parcela').childNodes[1].childNodes[0]
  ).toHaveValue('31/12/1969');
});

it('should have two object in array of pagamento', () => {
  render(<VendaForm />, { initialState });

  //Seleção de um Produto -------------------------------------------------------
  const productAutocomplete =
    screen.getByTestId('produto').childNodes[0].childNodes[1].childNodes[0];

  productAutocomplete.focus();
  fireEvent.change(document.activeElement, { target: { value: 'ba' } });
  fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
  fireEvent.keyDown(document.activeElement, { key: 'Enter' });
  document.activeElement.blur();
  expect(productAutocomplete.value).toEqual('Bag');
  // ----------------------------------------------------------------------------

  fireEvent.change(screen.getByTestId('parcelas').childNodes[1].childNodes[0], {
    target: { value: 2 },
  });

  expect(
    screen.getAllByTestId('numero-parcela')[0].childNodes[1].childNodes[0]
  ).toHaveValue('1');
  expect(
    screen.getAllByTestId('valor-parcela')[0].childNodes[1].childNodes[1]
  ).toHaveValue('25,00');
  expect(
    screen.getAllByTestId('data-parcela')[0].childNodes[1].childNodes[0]
  ).toHaveValue('31/12/1969');

  expect(
    screen.getAllByTestId('numero-parcela')[1].childNodes[1].childNodes[0]
  ).toHaveValue('2');
  expect(
    screen.getAllByTestId('valor-parcela')[1].childNodes[1].childNodes[1]
  ).toHaveValue('25,00');
  expect(
    screen.getAllByTestId('data-parcela')[1].childNodes[1].childNodes[0]
  ).toHaveValue('31/01/1970');
});

it('should throw an error message when click on add new item without selecting first product', () => {
  render(<VendaForm />, { initialState });

  //add new product
  fireEvent.click(screen.getByTestId('add-new-item'));

  expect(
    screen.queryByText(
      'Selecione um produto, para adicionar um novo item vendido.'
    )
  ).toBeInTheDocument();

  //Seleção de um Produto -------------------------------------------------------
  const productAutocomplete =
    screen.getByTestId('produto').childNodes[0].childNodes[1].childNodes[0];

  productAutocomplete.focus();
  fireEvent.change(document.activeElement, { target: { value: 'ba' } });
  fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
  fireEvent.keyDown(document.activeElement, { key: 'Enter' });
  document.activeElement.blur();
  expect(productAutocomplete.value).toEqual('Bag');
  // ----------------------------------------------------------------------------

  //add new product
  fireEvent.click(screen.getByTestId('add-new-item'));

  expect(
    screen.queryByText(
      'Selecione um produto, para adicionar um novo item vendido.'
    )
  ).not.toBeInTheDocument();
});

it('should change forma de pagamento and have one object in array of pagamento', () => {
  render(<VendaForm />, { initialState });

  //Seleção de um Produto -------------------------------------------------------
  const productAutocomplete =
    screen.getByTestId('produto').childNodes[0].childNodes[1].childNodes[0];

  productAutocomplete.focus();
  fireEvent.change(document.activeElement, { target: { value: 'ba' } });
  fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
  fireEvent.keyDown(document.activeElement, { key: 'Enter' });
  document.activeElement.blur();
  expect(productAutocomplete.value).toEqual('Bag');
  // ----------------------------------------------------------------------------

  fireEvent.change(screen.getByTestId('forma-pagamento').childNodes[1], {
    target: { value: 'avista' },
  });

  expect(
    screen.getByTestId('numero-parcela').childNodes[1].childNodes[0]
  ).toHaveValue('1');
  expect(
    screen.getByTestId('valor-parcela').childNodes[1].childNodes[1]
  ).toHaveValue('50,00');
  expect(
    screen.getByTestId('data-parcela').childNodes[1].childNodes[0]
  ).toHaveValue('31/12/1969');
  expect(screen.getByTestId('forma-pagamento').childNodes[1]).toHaveValue(
    'avista'
  );
});

it('should get sale number from props numero', () => {
  render(<VendaForm numero="00000" />, { initialState });

  expect(
    screen.getByTestId('numero-venda').childNodes[1].childNodes[0]
  ).toHaveValue('00000');
});

it('should get sale number from props venda', () => {
  render(<VendaForm venda={saleObject} />, { initialState });

  expect(
    screen.getByTestId('numero-venda').childNodes[1].childNodes[0]
  ).toHaveValue('00003');
});

it('should open modal to add new client direct from selection', () => {
  render(<VendaForm />, { initialState });

  const clientAutocomplete =
    screen.getByTestId('cliente').childNodes[0].childNodes[1].childNodes[0];

  clientAutocomplete.focus();
  fireEvent.change(document.activeElement, { target: { value: 'asdasdad' } });
  userEvent.click(screen.getByTestId('add-novo-cliente'));

  expect(screen.getByRole('modalContent')).toBeInTheDocument();
  expect(screen.getByText('Novo Cliente')).toBeInTheDocument();
});

it('should open modal to add new product direct from selection', () => {
  render(<VendaForm />, { initialState });

  const productAutocomplete =
    screen.getByTestId('produto').childNodes[0].childNodes[1].childNodes[0];

  productAutocomplete.focus();
  fireEvent.change(document.activeElement, { target: { value: 'asdasdad' } });
  userEvent.click(screen.getByTestId('add-novo-produto'));

  expect(screen.getByRole('modalContent')).toBeInTheDocument();
  expect(screen.getByText('Novo Produto')).toBeInTheDocument();
});

it('should handle close modal from client modal', async () => {
  const cliente = { id: '222', nome: 'Delta Major' };

  mockDispatchFn = jest.fn(() => Promise.resolve({ cliente }));
  useDispatchSpy.mockReturnValue(mockDispatchFn);

  render(<VendaForm />, { initialState });

  //Seleção de um cliente -------------------------------------------------------
  const clientAutocomplete =
    screen.getByTestId('cliente').childNodes[0].childNodes[1].childNodes[0];

  clientAutocomplete.focus();
  fireEvent.change(document.activeElement, { target: { value: 'asdasdad' } });
  userEvent.click(screen.getByTestId('add-novo-cliente'));
  //---------------------------------------------------------------------------
  expect(screen.getByRole('modalContent')).toBeInTheDocument();
  expect(screen.getByText('Novo Cliente')).toBeInTheDocument();

  fireEvent.change(
    screen.getByTestId('nome-completo').childNodes[1].childNodes[0],
    {
      target: {
        value: 'Delta Major',
      },
    }
  );

  userEvent.click(screen.getByTestId('save-button-cliente'));
  await waitForElementToBeRemoved(() =>
    screen.getByTestId('save-button-cliente')
  );

  expect(clientAutocomplete.value).toEqual('Delta Major');
  expect(screen.queryByRole('modalContent')).not.toBeInTheDocument();
  expect(screen.queryByText('Novo Cliente')).not.toBeInTheDocument();
});

it('should handle close modal from product modal', async () => {
  const produto = {
    nome: 'Wallet',
    unidade: 'Un',
    peso: '500',
    valorCusto: 1000,
    status: 'ativo',
    valorVenda: 2500,
    fornecedor: 'Kobe',
  };

  mockDispatchFn = jest.fn(() => Promise.resolve({ produto }));
  useDispatchSpy.mockReturnValue(mockDispatchFn);

  render(<VendaForm />, { initialState });

  //Seleção de um Produto -------------------------------------------------------
  const productAutocomplete =
    screen.getByTestId('produto').childNodes[0].childNodes[1].childNodes[0];

  productAutocomplete.focus();
  fireEvent.change(document.activeElement, { target: { value: 'asdasda' } });
  userEvent.click(screen.getByTestId('add-novo-produto'));
  //---------------------------------------------------------------------------
  expect(screen.getByRole('modalContent')).toBeInTheDocument();
  expect(screen.getByText('Novo Produto')).toBeInTheDocument();

  fireEvent.change(
    screen.getByTestId('nome-produto').childNodes[1].childNodes[0],
    {
      target: {
        value: 'Wallet',
      },
    }
  );

  fireEvent.change(
    screen.getByTestId('preco-custo').childNodes[1].childNodes[1],
    {
      target: {
        value: 1000,
      },
    }
  );

  fireEvent.change(
    screen.getByTestId('valor-venda').childNodes[1].childNodes[1],
    {
      target: {
        value: 2500,
      },
    }
  );

  userEvent.click(screen.getByTestId('save-button-produto'));
  await waitForElementToBeRemoved(() =>
    screen.getByTestId('save-button-produto')
  );

  expect(productAutocomplete.value).toEqual('Wallet');
  expect(screen.queryByRole('modalContent')).not.toBeInTheDocument();
  expect(screen.queryByText('Novo Produto')).not.toBeInTheDocument();
});
