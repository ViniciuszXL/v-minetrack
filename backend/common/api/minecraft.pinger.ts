const pinger = require('minecraft-ping-js');

export class MinecraftPing {

    host: String;
    port?: Number;

    constructor(host: String, port?: Number) {
        this.host = host;
        this.port = port;
    }

    status(): Promise<any> {
        return pinger.pingWithPromise(this.host, this.port || 25565).then(this.render());
    }

    render() {
        return (server) => {
            const { version, players, description, favicon, ping } = server;
            const { name, protocol } = version;
            const { max, online, sample } = players;
            
            return {
                host: this.host,
                versionName: name,
                versionProtocol: protocol,
                onlinePlayers: online,
                maxPlayers: max,
                sample: sample,
                description: description,
                favicon: favicon,
                ping: ping
            }
        }
    }

}