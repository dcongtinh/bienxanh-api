import dotenv from 'dotenv'

const getEnvFileName = () => {
    switch (process.env.NODE_ENV) {
        case 'development':
            return '.env.development'
        case 'production':
            return '.env.production'
        default:
            return '.env.development'
    }
}

dotenv.config({
    path: getEnvFileName()
})

const config = {
    WEB_URL: process.env.WEB_URL,
    MONGO_URL: process.env.MONGO_URL,
    PRIVATE_KEY: process.env.PRIVATE_KEY
}

export default config
