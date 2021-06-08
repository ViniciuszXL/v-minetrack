export const environment = {
    APPLICATION: {
        NAME: process.env.APPLICATION_NAME || 'v-minetrack',
        VERSION: process.env.APPLCATION_VERSION || '0.0.1'
    },
    SERVER: {
        PORT: process.env.SERVER_PORT || 8080
    },
    MONGO: {
        URI: process.env.MONGO_URI || 'mongodb://',
        HOST: process.env.MONGO_HOST || 'localhost',
        DATABASE: process.env.MONGO_DATABASE || 'v-minetrack',
        PORT: process.env.MONGO_PORT || 27017
    }
}