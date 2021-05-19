import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AddCliente, AddProduto, Modal } from '../../components';
import Form from '../forms/Form';
import { startSetClientes } from '../../actions/clientes';
import { startSetProdutos } from '../../actions/produtos';
import VendaFormProdutos from './VendaFormProdutos';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Save, Add, Delete } from '@material-ui/icons';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { StyledButton } from '../forms/elements';
import PagamentoForm from './PagamentoForm';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { currencyFormatter } from '../forms/utils/numbersFormatters';

const baseItem = {
  id: '123',
  unidade: '',
  quantidade: '',
  valorVenda: 0,
  valorTotal: 0,
};

const VendaForm = (props) => {
  const dispatch = useDispatch();

  //Parte base da venda
  const [numero, setNumero] = useState(props.venda?.numero || props.numero);
  const [status, setStatus] = useState(props.venda?.status || 'em andamento');
  const [dataVenda, setDataVenda] = useState(
    props.venda?.dataVenda || new Date()
  );
  const [cliente, setCliente] = useState(
    props.venda?.cliente || { id: '', nome: '' }
  );

  //Itens vendidos
  const [itensVendidos, setItensVendidos] = useState(
    props.venda?.itensVendidos || [baseItem]
  );

  //Resumo da Venda
  const [subTotal, setSubTotal] = useState(props.venda?.subTotal || 0);
  const [frete, setFrete] = useState(props.venda?.frete || 0);
  const [desconto, setDesconto] = useState(props.venda?.desconto || 0);
  const [taxa, setTaxa] = useState(props.venda?.taxa || 0);
  const [total, setTotal] = useState(props.venda?.total || 0);
  const [formaPagamento, setFormaPagamento] = useState(
    props.venda?.formaPagamento || ''
  );
  const [parcelas, setParcelas] = useState(props.venda?.parcelas || 1);
  const [pagamento, setPagamento] = useState(
    props.venda?.pagamento || [{ numeroParcela: 1 }]
  );
  const [observacoes, setObservacoes] = useState(
    props.venda?.observacoes || ''
  );

  //States básicos
  const [createdAt] = useState(props.venda?.createdAt || new Date());
  const [error, setError] = useState('');
  const [modalShow, setModalShow] = useState(undefined);

  //Calculos referentes a geração das parcelas e forma de pagamento
  const handleParcelas = (e, newTotal) => {
    const newValue = e.target.value;
    if (newValue > 0) {
      setParcelas(newValue);

      let arr = [];
      for (let i = 0; i < newValue; i++) {
        arr = arr.concat({
          numeroParcela: i + 1,
          valorParcela: newTotal || total / newValue,
          dataParcela: moment().add(i, 'months').valueOf(),
          inseridoManualmente: false,
        });
      }

      setPagamento(arr);
    }
  };

  const handleFormaPagamento = (e) => {
    setFormaPagamento(e.target.value);

    if (!pagamento[0].valorParcela) {
      handleParcelas({ target: { value: parcelas } });
    }
  };

  /////////////////////////////////////////////////////////////

  useEffect(() => {
    if (!props.venda?.numero) {
      setNumero(props.numero);
    }
    // eslint-disable-next-line
  }, [props.vendas, props.numero]);

  //Get recent data
  useEffect(() => {
    dispatch(startSetClientes());
    dispatch(startSetProdutos());
    // eslint-disable-next-line
  }, []);

  //Calculate the subTotal
  useEffect(() => {
    const newValue = itensVendidos.reduce(
      (acc, cur) => acc + cur.valorTotal,
      0
    );

    setSubTotal(newValue);
  }, [itensVendidos]);

  //Calculate the total amount
  useEffect(() => {
    const newValue = subTotal + (frete - desconto) - taxa;

    handleParcelas({ target: { value: parcelas } }, newValue / parcelas);

    setTotal(newValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subTotal, desconto, frete, taxa, parcelas]);

  const clientes = useSelector((state) => state.clientes);

  const produtos = useSelector((state) => state.produtos);

  const handleFrete = (values) => {
    setFrete(values.floatValue);
  };

  const handleDesconto = (values) => {
    setDesconto(values.floatValue);
  };

  const handleTaxa = (values) => {
    setTaxa(values.floatValue);
  };

  const handleAddNewItem = () => {
    if (itensVendidos[itensVendidos.length - 1].id === '') {
      setError('Selecione um produto, para adicionar um novo item vendido.');
      return;
    }

    setError('');
    setItensVendidos([...itensVendidos, baseItem]);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (itensVendidos[0]?.id === '' || !dataVenda || !cliente) {
      setError('Preencha todas as informações obrigatórias');
      // Set error state equal to 'Please provide description and amount.'
    } else {
      setError('');
      // Clear the error
      props.onSubmit({
        numero,
        cliente,
        itensVendidos,
        dataVenda: dataVenda.valueOf(),
        status,
        observacoes,
        subTotal,
        total,
        taxa,
        desconto,
        frete,
        parcelas,
        pagamento,
        formaPagamento,
        createdAt: createdAt.valueOf(),
      });
    }
  };

  const handleNovoCliente = () => {
    setModalShow('cliente');
  };

  const handleClose = () => {
    setModalShow(undefined);
  };

  const handleClienteSubmit = (data) => {
    setModalShow(undefined);
    setCliente({
      id: data.id,
      nome: data.nome,
    });
  };

  const addClienteButton = (
    <StyledButton.Borderless
      onMouseDown={(e) => {
        e.stopPropagation();
        handleNovoCliente();
      }}
      title="Clique aqui para criar um novo cliente"
    >
      + adicionar novo cliente
    </StyledButton.Borderless>
  );

  const handleSelectProduto = (e, newValue, index) => {
    const indexMaster = index;

    const newArray = itensVendidos?.map((i, index) => {
      if (index !== indexMaster) {
        return { ...i };
      }
      return {
        ...i,
        id: newValue?.id || '',
        nome: newValue?.nome || '',
        unidade: newValue?.unidade || '',
        quantidade: newValue ? 1 : '',
        valorVenda: newValue?.valorVenda || '',
        valorTotal: newValue?.valorVenda * 1 || '',
      };
    });

    setItensVendidos(newArray);
  };

  const handleProdutoSubmit = (data) => {
    setModalShow(undefined);
    const index = itensVendidos?.findIndex((i) => !i.id);
    handleSelectProduto(undefined, data, index);
  };

  return (
    <>
      {modalShow === 'cliente' ? (
        <Modal
          key="modal_add_cliente"
          width="80%"
          alignment="left"
          handleClose={handleClose}
        >
          <AddCliente
            handleSubmit={handleClienteSubmit}
            showBackButton={true}
          />
        </Modal>
      ) : modalShow === 'produto' ? (
        <Modal
          key="modal_add_produto"
          width="80%"
          alignment="left"
          handleClose={props.handleClose}
        >
          <AddProduto
            handleSubmit={handleProdutoSubmit}
            showBackButton={true}
          />
        </Modal>
      ) : undefined}
      <Form onSubmit={onSubmit} className="general-form">
        <Form.Division>
          <TextField
            className="form-item-p"
            label="Número da Venda"
            required
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            disabled={true}
          />
          <FormControl required>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              className="form-item-m"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="em andamento">Em Andamento</MenuItem>
              <MenuItem value="orcamento">Orçamento</MenuItem>
              <MenuItem value="a receber">À Receber</MenuItem>
              <MenuItem value="concluida">Concluída</MenuItem>
              <MenuItem value="cancelada">Cancelada</MenuItem>
            </Select>
          </FormControl>
          <KeyboardDatePicker
            autoOk={true}
            className="form-item-p"
            disableToolbar
            variant="inline"
            format="DD/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Data da Venda"
            value={dataVenda}
            onChange={(e) => setDataVenda(e)}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />

          <Autocomplete
            className="form-item-m"
            options={clientes.sort((a, b) =>
              a.nome.toLowerCase() > b.nome.toLowerCase() ? 1 : -1
            )}
            getOptionLabel={(option) => option.nome || ''}
            getOptionSelected={(option, value) => option.value === value.value}
            value={cliente}
            onChange={(e, newValue) => {
              setCliente({
                id: newValue?.id,
                nome: newValue?.nome,
              });
            }}
            renderInput={(inputProps) => (
              <TextField label="Selecione o Cliente" {...inputProps} />
            )}
            noOptionsText={addClienteButton}
          />
        </Form.Division>
        <Form.Division>
          <Form.List>
            <p>Itens Vendidos</p>
            {/* Itens purchased listing */}
            {itensVendidos?.map((item, index) => (
              <VendaFormProdutos
                key={item.id}
                produtos={produtos}
                index={index}
                itensVendidos={itensVendidos}
                setItensVendidos={setItensVendidos}
                setModalShow={setModalShow}
                handleSelectProduto={handleSelectProduto}
              />
            ))}
          </Form.List>
        </Form.Division>
        <Form.Division>
          <StyledButton
            title="Clique aqui para adicionar um item no carrinho"
            className="form-item-p"
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleAddNewItem}
          >
            Item
          </StyledButton>
        </Form.Division>
        <Form.Division>
          <NumberFormat
            required
            disabled
            className="textfield-align-right"
            label="SubTotal"
            decimalScale={2}
            decimalSeparator=","
            fixedDecimalScale
            placeholder="0,00"
            thousandSeparator="."
            customInput={TextField}
            value={subTotal}
            format={currencyFormatter}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              ),
            }}
          />
          <NumberFormat
            className="textfield-align-right"
            label="Frete"
            decimalScale={2}
            decimalSeparator=","
            fixedDecimalScale
            placeholder="0,00"
            thousandSeparator="."
            customInput={TextField}
            value={frete}
            onValueChange={handleFrete}
            format={currencyFormatter}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              ),
            }}
          />
          <NumberFormat
            className="textfield-align-right"
            label="Desconto"
            decimalScale={2}
            decimalSeparator=","
            fixedDecimalScale
            placeholder="0,00"
            thousandSeparator="."
            customInput={TextField}
            value={desconto}
            onValueChange={handleDesconto}
            format={currencyFormatter}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              ),
            }}
          />
          <NumberFormat
            className="textfield-align-right"
            label="Taxa"
            decimalScale={2}
            decimalSeparator=","
            fixedDecimalScale
            placeholder="0,00"
            thousandSeparator="."
            customInput={TextField}
            value={taxa}
            onValueChange={handleTaxa}
            format={currencyFormatter}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              ),
            }}
          />
          <NumberFormat
            required
            disabled
            className="textfield-align-right"
            label="Total"
            decimalScale={2}
            decimalSeparator=","
            fixedDecimalScale
            placeholder="0,00"
            thousandSeparator="."
            customInput={TextField}
            value={total}
            format={currencyFormatter}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              ),
            }}
          />
        </Form.Division>
        <Form.Division>
          <FormControl required>
            <InputLabel id="demo-simple-select-label">
              Forma de Pagamento
            </InputLabel>
            <Select
              className="form-item-m"
              value={formaPagamento}
              onChange={handleFormaPagamento}
            >
              <MenuItem value="">Selecione...</MenuItem>
              <MenuItem value="avista">À Vista</MenuItem>
              <MenuItem value="aprazo">À Prazo</MenuItem>
              <MenuItem value="boleto">Boleto</MenuItem>
              <MenuItem value="credito">Cartão de Crédito</MenuItem>
              <MenuItem value="debito">Cartão de Débito</MenuItem>
              <MenuItem value="cheque">Cheque</MenuItem>
              <MenuItem value="pix">Pix</MenuItem>
            </Select>
          </FormControl>
          <TextField
            required
            className="form-item-p"
            label="Parcelas"
            variant="standard"
            type="number"
            InputLabelProps={{ shrink: true }}
            value={parcelas}
            onChange={handleParcelas}
          />
        </Form.Division>
        {pagamento?.map((i, index) => (
          <Form.Division key={`KeyPacela_${i.numeroParcela}`}>
            <PagamentoForm
              pagamento={pagamento}
              setPagamento={setPagamento}
              index={index}
              total={total}
            />
          </Form.Division>
        ))}
        <Form.Division>
          <TextField
            label="Observações"
            multiline
            rows={4}
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
          />
        </Form.Division>
        {error && <Form.Error>{error}</Form.Error>}
        <Form.Actions>
          <StyledButton
            title="Clique aqui para salvar"
            variant="contained"
            color="primary"
            type="submit"
            startIcon={<Save />}
          >
            Salvar
          </StyledButton>
          {props?.handleDelete && (
            <StyledButton.Secundary
              title="Clique aqui para excluir"
              variant="contained"
              color="secondary"
              type="button"
              startIcon={<Delete />}
              onClick={props.handleDelete}
            >
              Remover
            </StyledButton.Secundary>
          )}
        </Form.Actions>
      </Form>
    </>
  );
};

export { VendaForm as default };
