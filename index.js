const express = require('express')
const app = express()
const port = 3000
app.use(express.json())
const uuid = require('uuid')


//Checar Id e Index
const checkId = (request, response, next) => {

    const { id } = request.params
    const index = orders.findIndex(user => user.id === id)
    if (index < 0) {

        return response.status(404).json({ error: "User not found" })
    }

    request.orderId = id
    request.orderIndex = index

    next()
}


const orders = []

//Mostrar Lista de pedidos
app.get('/order', (request, response) => {

    return response.json(orders)

})

//Criar pedido
app.post('/order', (request, response) => {

    const { order, clientName, price, status } = request.body
    const newOrder = { id: uuid.v4(), order, clientName, price, status }
    orders.push(newOrder)

    return response.json(newOrder)
})

//Atualizar Pedido
app.put('/order/:id', checkId, (request, response) => {

    const id = request.orderId
    const index = request.orderIndex
    const { order, clientName, price, status } = request.body
    const updateOrder = { id, order, clientName, price, status }

    orders[index] = updateOrder

    return response.json(updateOrder)


})

//Deletar Pedido
app.delete('/order/:id', checkId, (request, response) => {

    const index = request.orderIndex

    orders.splice(index, 1)

    return response.status(201).json({ message: "User Deleted" })
})

//Mostrar um pedido especifico
app.get('/order/:id', checkId, (request, response) => {

    const index = request.orderIndex

    const showOnlyOrder = orders[index]

    return response.json(showOnlyOrder)


})


//Atualizar Pedido Pronto

app.patch('/order/:id', checkId, (request, response) => {

    const id = request.orderId
    const index = request.orderIndex

    const FinishedOrder = {
        id,
        order: orders[index].order,
        clientName: orders[index].clientName,
        price: orders[index].price,
        status: "Pedido Finalizado"
    }

    orders[index] = FinishedOrder
 
    return response.json(FinishedOrder)
})

//servidor
app.listen(port, () => {

    console.log('FUNFANDO')
})


