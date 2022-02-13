import dotenv from 'dotenv'

const dev = process.env.NODE_ENV !== 'production'

if (dev) {
    dotenv.config()
}

console.log('MONGO_URL', process.env.MONGO_URL)

const config = {
    WEB_URL: process.env.WEB_URL,
    MONGO_URL: process.env.MONGO_URL,
    PRIVATE_KEY: process.env.PRIVATE_KEY
}

export default config
