export const environment = {
    APPLICATION: {
        NAME: process.env.APPLICATION_NAME || 'v-minetrack',
        VERSION: process.env.APPLCATION_VERSION || '0.0.1'
    },
    CODE: {
        INTERN: 500,
        REDIRECT: 300,

        REQUEST: 400,
        NOT_ALLOWED: 401,
        PROHIBITED: 403,
        NOT_FOUND: 404
    },
    SERVER: {
        PORT: process.env.SERVER_PORT || 8080
    },
    MONGO: {
        URI: process.env.MONGO_URI || 'mongodb://',
        HOST: process.env.MONGO_HOST || 'localhost',
        DATABASE: process.env.MONGO_DATABASE || 'v-minetrack',
        PORT: process.env.MONGO_PORT || 27017
    },
    REDIS: {
        HOST: process.env.REDIS_HOST || 'localhost',
        PORT: process.env.REDIS_PORT || 6379,

        KEY: {
            SERVER_PING_CACHE: '#SERVER_PING_CACHE_'
        }
    }
}