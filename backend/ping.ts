import * as MCPing from './common/api/minecraft.pinger';

const ping = new MCPing.MinecraftPing();

ping.status('mushmc.com.br').then(console.log).catch(console.error);