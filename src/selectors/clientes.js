//import moment from 'moment'

//Get visible expenses

export default (clientes) => {
    return clientes.filter((cliente) => {
      //const createdAtMoment = moment(expense.createdAt)
      //const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true 
      //const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true
      //const textMatch = typeof text !== 'string' || expense.description.toLowerCase().includes(text.toLowerCase())
  
      return cliente
    })
  }
