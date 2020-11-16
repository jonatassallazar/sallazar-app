import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startEditProduto, startRemoveProduto } from '../actions/produtos'
import ProdutoForm from './ProdutoForm'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import { startSetProdutos } from '../actions/produtos'

const EditarProduto = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startSetProdutos())
        // eslint-disable-next-line
    }, [])

    const produto = useSelector((state) => {
        return state.produtos.find((produto) => produto.id === props.match.params.id)
    })

    const onSubmit = data => {
        dispatch(startEditProduto(produto.id, data)).then(() => props.history.push(`/produtos`))
    }

    return (
        <div>
            <h1>Editar Produto</h1>
            <ProdutoForm
                produto={produto}
                onSubmit={onSubmit} />
            <Button
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={() => {
                    dispatch(startRemoveProduto({ id: produto.id })).then(() => {
                        props.history.push('/produtos')
                    })
                }}>Remove</Button>
        </div>
    )
}

export { EditarProduto as default }
