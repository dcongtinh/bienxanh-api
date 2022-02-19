import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import morgan from 'morgan'
import boom from 'express-boom'
import config from './src/config'

// Routes
import {
    authRoute,
    wareHouseRoute,
    unitRoute,
    itemRoute,
    orderRoute,
    supplierRoute,
    exportRoute,
} from 'routes'

const app = express()
app.use(express.static('public'))

const PORT = process.env.PORT || 4000

// Connect to MongoDB
mongoose.connect(config.MONGO_URL, {
    useNewUrlParser: true,
})
mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected')
})
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose is disconnected')
})
mongoose.connection.on('error', (error) => {
    console.log('Mongoose error', error)
})

// Middlewares
app.use(
    bodyParser.json({
        limit: '50mb',
    })
)

app.use(
    bodyParser.urlencoded({
        limit: '50mb',
        parameterLimit: 100000,
        extended: true,
    })
)

app.use(morgan('dev'))
app.use(boom())

// CORS
app.use((req, res, next) => {
    // if (process.env.NODE_ENV !== 'production') {
    //     res.setHeader('Access-Control-Allow-Origin', '*')
    // } else {
    //     res.setHeader('Access-Control-Allow-Origin', config.WEB_URL)
    // }
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    )
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Authorization, Accept'
    )
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Content-Type', 'application/*')
    res.setHeader('Content-Type', 'text/*')
    next()
})

// Routes
app.use('/auth', authRoute)
app.use('/warehouses', wareHouseRoute)
app.use('/units', unitRoute)
app.use('/items', itemRoute)
app.use('/orders', orderRoute)
app.use('/suppliers', supplierRoute)
app.use('/exports', exportRoute)

app.get('/', (req, res) => {
    res.json({
        message: "I'm working!",
    })
})

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT)
})
