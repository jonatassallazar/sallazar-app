import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFornecedorFiltro, setNomeFiltro, setStatusFiltro, sortByNomeAsc, sortByNomeDec, sortByCreatedAtAsc, sortByCreatedAtDec, sortByPrecoAsc, sortByPrecoDec } from '../actions/filtrosProdutos'
import Input from '@material-ui/core/Input'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const FiltroProduto = () => {
    const dispatch = useDispatch()
    const { nome, fornecedor, status, sortBy } = useSelector((state) => state.filtrosProdutos)

    return (
        <div>
            <Input
                type="text"
                value={nome}
                placeholder="Nome"
                onChange={(e) => {
                    dispatch(setNomeFiltro(e.target.value))
                }} />
            <Input
                type="text"
                value={fornecedor}
                placeholder="Fornecedor"
                onChange={(e) => {
                    dispatch(setFornecedorFiltro(e.target.value))
                }} />
            
            <Select
                value={status}
                onChange={(e) => dispatch(setStatusFiltro(e.target.value))}>
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="ativo">Ativo</MenuItem>
                <MenuItem value="inativo">Inativo</MenuItem>
            </Select>
            <Select
                value={sortBy}
                onChange={(e) => {
                    switch (e.target.value) {
                        case 'nomeasc':
                            return dispatch(sortByNomeAsc())
                        case 'nomedec':
                            return dispatch(sortByNomeDec())
                        case 'precoasc':
                            return dispatch(sortByPrecoAsc())
                        case 'precodec':
                            return dispatch(sortByPrecoDec())
                        case 'createdatasc':
                            return dispatch(sortByCreatedAtAsc())
                        case 'createdatdec':
                            return dispatch(sortByCreatedAtDec())
                        default:
                            break;
                    }
                }}>
                <MenuItem value="nomeasc">Nome A-Z</MenuItem>
                <MenuItem value="nomedec">Nome Z-A</MenuItem>
                <MenuItem value="precoasc">Preço Crescente</MenuItem>
                <MenuItem value="precodec">Preço Decrescente</MenuItem>
                <MenuItem value="createdatasc">Criado Crescente</MenuItem>
                <MenuItem value="createdatdec">Criado Decrescente</MenuItem>
            </Select>
        </div>
    )
}



export { FiltroProduto as default }