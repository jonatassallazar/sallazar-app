import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import SaveIcon from '@material-ui/icons/Save'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import CurrencyFormat from 'react-currency-format'
import { useSelector, useDispatch } from 'react-redux'
import { startSetClientes } from '../actions/clientes'
import { startSetProdutos } from '../actions/produtos'
import { KeyboardDatePicker } from '@material-ui/pickers'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'

let hasPopulated = false

const VendaForm = (props) => {
    const dispatch = useDispatch()

    const [numero, setNumero] = useState('')
    const [cliente, setCliente] = useState('')
    const [produtos, setProdutos] = useState([])
    const [subTotal, setSubTotal] = useState('')
    const [status, setStatus] = useState('Ativo')
    const [total, setTotal] = useState('')
    const [frete, setFrete] = useState('')
    const [desconto, setDesconto] = useState('')
    const [observacoes, setObservacoes] = useState('')
    const [dataVenda, setDataVenda] = useState('')
    const [createdAt, setCreatedAt] = useState(new Date())
    const [error, setError] = useState('')

    useEffect(() => {
        dispatch(startSetClientes())
        dispatch(startSetProdutos())
        // eslint-disable-next-line
    }, [])

    const clientes = useSelector((state) => state.clientes)
    const produtosLista = useSelector((state) => state.produtos)

    //Popula os campos
    if (props.venda && !hasPopulated) {
        setNumero(props.venda.numero)
        setCliente(props.venda.cliente)
        setProdutos(props.venda.produtos)
        setSubTotal(props.venda.subTotal)
        setStatus(props.venda.status || ['Ativo'])
        setTotal(props.venda.total)
        setFrete(props.venda.frete)
        setDesconto(props.venda.desconto)
        setObservacoes(props.venda.observacoes)
        setDataVenda(props.venda.dataVenda)
        setCreatedAt(props.venda.createdAt)
        hasPopulated = true
    }


    //Limpa a função de popular os campos
    useEffect(() => {
        return () => hasPopulated = false
    }, [])

    const onSubmit = (e) => {
        e.preventDefault()

        if (!produtos) {
            setError('Coloque os Produtos')
            // Set error state equal to 'Please provide description and amount.'
        } else {
            setError('')
            // Clear the error
            props.onSubmit({
                numero,
                cliente,
                produtos,
                dataVenda,
                status,
                observacoes,
                subTotal,
                total,
                desconto,
                frete,
                createdAt: createdAt.valueOf()
            })
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit} className='general-form'>
                <TextField
                    className='form-inside-field'
                    id="standard-basic"
                    label="Número"
                    required={true}
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    disabled={true}
                />
                <Select
                    className='form-inside-field'
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <MenuItem value="Ativo">Ativo</MenuItem>
                    <MenuItem value="Inativo">Inativo</MenuItem>
                </Select>
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="DD/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="De"
                    value={dataVenda}
                    onChange={(e) => setDataVenda(e)}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Select
                    className='form-inside-field'
                    value={cliente}
                    onChange={(e) => setCliente(e.target.value)}
                >
                    {clientes.map((cliente) => (
                        <MenuItem value={cliente.id}>{cliente.nome}</MenuItem>
                    ))}
                </Select>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Produto</InputLabel>
                    <Select
                        autoWidth
                        className='form-inside-field'
                        value={produtos}
                        onChange={(e) => setGenero(e.target.value)}
                    >
                        <MenuItem value="" disabled>Sexo</MenuItem>
                        <MenuItem value="Masculino">Masculino</MenuItem>
                        <MenuItem value="Feminino">Feminino</MenuItem>
                    </Select>
                </FormControl>
                <CurrencyFormat
                    className='form-inside-field'
                    id="standard-basic"
                    label="Sub-Total"
                    value={subTotal}
                    onValueChange={(e) => setSubTotal(e.value)}
                    prefix={"R$"}
                    thousandSeparator={"."}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    decimalSeparator={","}
                    customInput={TextField}
                    isNumericString={true}
                />
                <CurrencyFormat
                    className='form-inside-field'
                    id="standard-basic"
                    label="Total"
                    value={frete}
                    onValueChange={(e) => setFrete(e.value)}
                    prefix={"R$"}
                    thousandSeparator={"."}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    decimalSeparator={","}
                    customInput={TextField}
                    isNumericString={true}
                />
                <CurrencyFormat
                    className='form-inside-field'
                    id="standard-basic"
                    label="Total"
                    value={desconto}
                    onValueChange={(e) => setDesconto(e.value)}
                    prefix={"R$"}
                    thousandSeparator={"."}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    decimalSeparator={","}
                    customInput={TextField}
                    isNumericString={true}
                />
                <CurrencyFormat
                    className='form-inside-field'
                    id="standard-basic"
                    label="Total"
                    value={total}
                    onValueChange={(e) => setTotal(e.value)}
                    prefix={"R$"}
                    thousandSeparator={"."}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    decimalSeparator={","}
                    customInput={TextField}
                    isNumericString={true}
                />
                <TextField
                    className='form-inside-field'
                    id="standard-basic"
                    label="Observações"
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    startIcon={<SaveIcon />}
                >Salvar</Button>
            </form>
            {error ? <p>{error}</p> : null}
        </div>
    )
}

export { VendaForm as default }