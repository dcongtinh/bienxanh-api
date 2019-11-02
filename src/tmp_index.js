import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import morgan from 'morgan'
import boom from 'express-boom'
import config from './src/config'
import http from 'http'
import socketIO from 'socket.io'

// Routes
import {
    authRoute,
    wareHouseRoute,
    itemRoute,
    orderRoute,
    supplierRoute,
    exportRoute
} from 'routes'

const app = express()

const PORT = process.env.PORT || 4000

// Connect to MongoDB
mongoose.connect(config.MONGO_URL, {
    useNewUrlParser: true
})
mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected')
})
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose is disconnected')
})
mongoose.connection.on('error', error => {
    console.log('Mongoose error', error)
})

// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(boom())
// CORS

app.use((req, res, next) => {
    if (process.env.NODE_ENV !== 'production') {
        res.setHeader('Access-Control-Allow-Origin', '*')
    } else {
        res.setHeader('Access-Control-Allow-Origin', config.WEB_URL)
    }
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    )
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With, content-type, Authorization'
    )
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
})

// Routes
app.use('/auth', authRoute)
app.use('/warehouses', wareHouseRoute)
app.use('/items', itemRoute)
app.use('/orders', orderRoute)
app.use('/suppliers', supplierRoute)
app.use('/exports', exportRoute)

app.get('/', (req, res) => {
    res.json({
        message: "I'm working!"
    })
})

// Config Socket.io
var server = http.Server(app)
var io = socketIO(server)
server.listen(PORT, () => console.log('Server running in port ' + PORT))

io.on('connection', function(socket) {
    console.log(socket.id + ': connected')
    socket.emit('id', socket.id)

    socket.on('disconnect', function() {
        console.log(socket.id + ': disconnected')
    })

    socket.on('newMessage', data => {
        io.sockets.emit('newMessage', { data: data, id: socket.id })
        console.log(data)
    })
})

// app.listen(PORT, () => {
//     console.log('Server is running on port ' + PORT)
// })
