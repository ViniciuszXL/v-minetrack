import * as redis from 'redis';
import { environment } from '../environment';

export class RedisClient {

    application: redis.createClient;

    startConnection(): Promise<any> {
        return new Promise((resolve, reject) => {
            const { HOST, PORT } = environment.REDIS;

            // Criando a conexão //
            this.application = redis.createClient({ host: HOST, port: PORT });

            // Conexão feita com sucesso //
            this.application.on('connect', () => {
                console.log('Successfully connected to Redis');
                resolve(this.application);
            });

            // Ocorreu um erro na conexão //
            this.application.on('error', reject);
        });
    }

    closeConnection(): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.application.quit();
                resolve(true);
            } catch (err) {
                reject(err);
            }
        });
    }

    set(key, name, value): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.application.hmset([ key, name, value ], (err, res) => {
                    if (err) return reject(err);
                    return resolve(res);
                });
            } catch (err) {
                reject(err);
            }
        });
    };

    get(key, name): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.application.hget([ key, name ], (err, res) => {
                    if (err) return reject(err);
                    return resolve(res);
                });
            } catch (err) {
                reject(err);
            }
        });
    };

    remove(key, name): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.application.hdel([ key, name ], (err, res) => {
                    if (err) return reject(err);
                    return resolve(res);
                });
            } catch (err) {
                reject(err);
            }
        });
    }

    // Redis Cache (DEFAULT: 5 minutes) //

    cache(key, value, time?): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.application.set([key, JSON.stringify(value), 'EX', time || 5 * 60], (err, res) => {
                    if (err) return reject(err);
                    return resolve(res);
                });
            } catch (err) {
                reject(err);
            }
        });
    }

    cacheFind(key): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.application.get([ key ], (err, res) => {
                    if (err) return reject(err);
                    return resolve(res ? JSON.parse(res) : null);
                })
            } catch (err) {
                reject(err);
            }
        });
    };

    // Redis Queue //
    push(key, value): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.application.rpush([ key, value ], (err, res) => {
                    if (err) return reject(err);
                    return resolve(res);
                })
            } catch (err) {
                reject(err);
            }
        });
    }

    pop(key): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.application.lpop([ key ], (err, res) => {
                    if (err) return reject(err);
                    return resolve(res);
                });
            } catch (err) {
                reject(err);
            }
        });
    }

}