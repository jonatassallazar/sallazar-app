import React from 'react'
import { Link } from 'react-router-dom'

const Clientes = () => {

    return (
        <div>
        <h1>Clientes</h1>
            <Link to="/clientes/novo">Novo Cliente</Link>
        </div> 
    )
}

export {Clientes as default}