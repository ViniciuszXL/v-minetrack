const pinger = require('minecraft-ping-js');

export class MinecraftPing {

    host: String;
    port?: Number;

    constructor(host: String, port?: Number) {
        this.host = host;
        this.port = port || 25565;
    }

    status(): Promise<any> {
        return pinger.pingWithPromise(this.host, this.port).then(this.render());
    }

    private render() {
        return (server) => {
            const { version, players, description, favicon, ping } = server;
            const { name, protocol } = version;
            const { max, online, sample } = players;
            
            return {
                host: this.host,
                port: this.port,
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