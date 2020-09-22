//import moment from 'moment'

//Get visible expenses

export default (clientes) => {
  return clientes.sort((a,b) =>  a.nome.toLowerCase() > b.nome.toLowerCase() ? 1 : -1 )
}
