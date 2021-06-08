import * as MCPing from './common/api/minecraft.pinger';

const ping = new MCPing.MinecraftPing('mushmc.com.br');

ping.status().then(console.log).catch(console.error);