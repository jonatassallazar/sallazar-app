import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import SaveIcon from '@material-ui/icons/Save'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

let hasPopulated = false

const ProdutoForm = (props) => {
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
    if (props.produto && !hasPopulated) {
        setNome(props.produto.nome)
        setUnidade(props.produto.unidade)
        setPeso(props.produto.email.peso)
        setValorCusto(props.produto.valorCusto)
        setStatus(props.produto.status || ['Ativo'])
        setValorVenda(props.produto.valorVenda)
        setFornecedor(props.produto.fornecedor)
        setFoto(props.produto.foto)
        setCreatedAt(props.produto.createdAt)
        hasPopulated = true
    }

    //Limpa a função de popular os campos
    useEffect(() => {
        return () => hasPopulated = false
    }, [])

    const onSubmit = (e) => {
        e.preventDefault()

        if (!nome) {
            setError('Digite um nome para o Produto')
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
            <form onSubmit={onSubmit}>
                <Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <MenuItem value="Ativo">Ativo</MenuItem>
                    <MenuItem value="Inativo">Inativo</MenuItem>
                </Select>
                <TextField
                    id="standard-basic"
                    label="Nome do Produto"
                    required={true}
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <TextField
                    id="standard-basic"
                    label="Unidade"
                    value={unidade}
                    onChange={(e) => setUnidade(e.target.value)}
                />
                <TextField
                    id="standard-basic"
                    label="Peso"
                    value={peso}
                    onChange={(e) => setPeso(e.target.value)}
                />
                <TextField
                    id="standard-basic"
                    label="Preço de Custo"
                    value={valorCusto}
                    onChange={(e) => setValorCusto(e.target.value)}
                />
                <TextField
                    id="standard-basic"
                    label="Valor de Venda"
                    value={valorVenda}
                    onChange={(e) => setValorVenda(e.target.value)}
                />
                <TextField
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

export { ProdutoForm as default }