import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setEmailFiltro, setNomeFiltro, setTelefoneFiltro, sortByNomeAsc, sortByNomeDec } from '../actions/filtrosClientes'
import Input from '@material-ui/core/Input'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const FiltroCliente = (props) => {
    const dispatch = useDispatch()
    const { nome, email, telefone, sortBy } = useSelector((state) => state.filtrosClientes)

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
                value={email}
                placeholder="Email"
                onChange={(e) => {
                    dispatch(setEmailFiltro(e.target.value))
                }} />
            <Input
                type="text"
                value={telefone}
                placeholder="Telefone"
                onChange={(e) => {
                    dispatch(setTelefoneFiltro(e.target.value))
                }} />
            <Select
                value={sortBy}
                onChange={(e) => {
                    if (e.target.value === 'nomeasc') {
                        dispatch(sortByNomeAsc())
                    } else if (e.target.value === 'nomedec') {
                        dispatch(sortByNomeDec())
                    }
                }}>
                <MenuItem value="nomeasc">Crescente</MenuItem>
                <MenuItem value="nomedec">Decrescente</MenuItem>
            </Select>
        </div>
    )
}



export { FiltroCliente as default }