import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import SaveIcon from '@material-ui/icons/Save'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import CurrencyFormat from 'react-currency-format'

let hasPopulated = false

const VendaForm = (props) => {
    const [nome, setNome] = useState('')
    const [unidade, setUnidade] = useState('')
    const [peso, setPeso] = useState('')
    const [valorCusto, setValorCusto] = useState('')
    const [status, setStatus] = useState('Ativo')
    const [valorVenda, setValorVenda] = useState('')
    const [fornecedor, setFornecedor] = useState('')
    const [foto, setFoto] = useState('')
    const [createdAt, setCreatedAt] = useState(new Date())
    const [error, setError] = useState('')

    //Popula os campos
    if (props.venda && !hasPopulated) {
        setNome(props.venda.nome)
        setUnidade(props.venda.unidade)
        setPeso(props.venda.peso)
        setValorCusto(props.venda.valorCusto)
        setStatus(props.venda.status || ['Ativo'])
        setValorVenda(props.venda.valorVenda)
        setFornecedor(props.venda.fornecedor)
        setFoto(props.venda.foto)
        setCreatedAt(props.venda.createdAt)
        hasPopulated = true
    }

    //Limpa a função de popular os campos
    useEffect(() => {
        return () => hasPopulated = false
    }, [])

    const onSubmit = (e) => {
        e.preventDefault()

        if (!nome) {
            setError('Digite um nome para o Venda')
            // Set error state equal to 'Please provide description and amount.'
        } else {
            setError('')
            // Clear the error
            props.onSubmit({
                nome,
                unidade,
                peso,
                valorCusto,
                status,
                valorVenda,
                fornecedor,
                foto,
                createdAt: createdAt.valueOf()
            })
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit} className='general-form'>
                <Select
                    className='form-inside-field'
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <MenuItem value="Ativo">Ativo</MenuItem>
                    <MenuItem value="Inativo">Inativo</MenuItem>
                </Select>
                <TextField
                    className='form-inside-field'
                    id="standard-basic"
                    label="Nome do Venda"
                    required={true}
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <TextField
                    className='form-inside-field'
                    id="standard-basic"
                    label="Unidade"
                    value={unidade}
                    onChange={(e) => setUnidade(e.target.value)}
                />
                <CurrencyFormat
                    className='form-inside-field'
                    id="standard-basic"
                    label="Peso"
                    value={peso}
                    onValueChange={(e) => setPeso(e.value)}
                    suffix={"g"}
                    thousandSeparator={"."}
                    decimalScale={2}
                    decimalSeparator={","}
                    customInput={TextField}
                    isNumericString={true}
                />
                <CurrencyFormat
                    className='form-inside-field'
                    id="standard-basic"
                    label="Preço de Custo"
                    value={valorCusto}
                    onValueChange={(e) => setValorCusto(e.value)}
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
                    label="Valor de Venda"
                    value={valorVenda}
                    onValueChange={(e) => setValorVenda(e.value)}
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
                    label="Fornecedor"
                    value={fornecedor}
                    onChange={(e) => setFornecedor(e.target.value)}
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