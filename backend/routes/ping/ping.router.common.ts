import { Router } from '../../common/router/router';

// API //
import * as minecraftPinger from '../../common/api/minecraft.pinger';
import { environment } from '../../common/environment';
import { Authorization } from '../../common/mongo/authorization.model';

export abstract class PingRouterCommon extends Router {

    ping = async (req, resp, next) => {
        // Parâmetros, token de autorização e classe do MinecraftPing //
        const { host } = req.params;
        const tokenAuth = req.header('Authorization');
        const pinger = new minecraftPinger.MinecraftPing(host);

        // Verificando se há um token de autorização //
        if (tokenAuth) {
            // Consultando o token de autorização //
            const auth = await Authorization.find({ token: tokenAuth });
            
            // Não foi encontrado nenhum //
            if (auth.length < 1) {
                // Imprimindo na requisição que esse método não é permitido //
                return this.renderError(resp, next, 'You are not allowed to use this.', environment.CODE.NOT_ALLOWED);
            }

            // Verificação do token foi realizada com sucesso.
            // Pegando as informações do servidor //
            pinger.status()
            
            // Conexão feita com sucesso e retornou alguns valores, imprimindo-os na tela //
            .then(this.renderThen(resp, next, { message: 'Request successfully completed' }))
            
            // Ocorreu um erro na conexão //
            .catch(this.renderError(resp, next, 'Server not found', environment.CODE.NOT_FOUND));
        }

        const key = `${ environment.REDIS.KEY.SERVER_PING_CACHE + this.formatHostname(host).toUpperCase() }`
        this.redis.cacheFind(key).then(cache => {
            // Há um cache criado no Redis, retornando-o //
            if (cache) {
                return this.render(resp, next, { response: cache, message: 'Request successfully completed.', cache: true });
            }

            // Pegando as informações do servidor //
            pinger.status()
            
            // Conexão feita com sucesso e retornou alguns valores //
            .then(result => {
                // Colocando o resultado em cache por 3 minuto no Redis //
                this.redis.cache(key, result, 3 * 60)
                
                // Cache criado com sucesso, agora retornado o valor para a web //
                .then(() => this.render(resp, next, { response: result, message: 'Request successfully completed', cache: false }))

                // Ocorreu um erro ao fazer o cache no Redis //
                .catch(this.renderError(resp, next, 'An error occurred to set cache of minecraft result!', environment.CODE.INTERN))
            })
            
            // Ocorreu um erro na conexão //
            .catch(this.renderError(resp, next, 'Server not found', environment.CODE.NOT_FOUND));
        });
    }

}