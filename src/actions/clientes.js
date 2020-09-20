import {database} from '../database/firebase'

//ADD_EXPENSE

export const addCliente = (cliente) => ({
    type: 'ADD_EXPENSE',
    cliente
})

export const startAddCliente = (clienteData = {}) => {
    return (dispatch) => {
        //const uid = getState().auth.uid
        const {
            nome = '',
            telefone = '',
            email = 0,
            dataDeNascimento = 0
        } = clienteData
        const cliente = { nome, telefone, email, dataDeNascimento }
        database.ref(`clientes`).push(clienteData).then((ref) => {
            dispatch(addCliente({
                id: ref.key,
                ...cliente
            }))
        })
    }
}

// //REMOVE_EXPENSE

// export const removeExpense = (id) => ({
//     type: 'REMOVE_EXPENSE',
//     expense: {
//         id
//     }
// })

// export const startRemoveExpense = ({ id } = {}) => {
//     return (dispatch, getState) => {
//         const uid = getState().auth.uid
//         return database.ref(`users/${uid}/expenses/${id}`).remove().then(() => {

//             dispatch(removeExpense(id))
//         })
//     }
// }

// //EDIT_EXPENSE

// export const editExpense = (id, updates) => ({
//     type: 'EDIT_EXPENSE',
//     id,
//     updates
// })

// export const startEditExpense = (id, updates) => {
//     return (dispatch) => {
//         return database.ref('expenses/' + id).update(updates).then(() => {

//             dispatch(editExpense(id, updates))
//         })
//     }
// }

// // SET_EXPENSES
// export const setExpenses = (expenses) => ({
//     type: 'SET_EXPENSES',
//     expenses
// })

// export const startSetExpenses = () => {
//     return (dispatch, getState) => {
//         const uid = getState().auth.uid
        
//         return database.ref(`users/${uid}/expenses`).once('value').then((snapshot) => {
//             const expenses = []

//             snapshot.forEach((childSnapshot) => {
//                 expenses.push({
//                     id: childSnapshot.key,
//                     ...childSnapshot.val()
//                 })
//             })
//             dispatch(setExpenses(expenses))
//         })
//     }
// }