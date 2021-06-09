import { expect, test } from '@jest/globals';
import 'jest';
import request from 'supertest';

// Environment //
import { environment } from '../../common/environment';

// Ping: MushMC //
test('GET - Ping (mushmc.com.br)', () => {
    return request(environment.TEST.URL)

    .get(environment.TEST.PING.MUSH)

    .then(response => expect(response.status).toBe(200))

    .catch(fail);
});

// Ping: FlameMC //
test('GET - Ping (flamemc.com.br)', () => {
    return request(environment.TEST.URL)

    .get(environment.TEST.PING.FLAME)

    .then(response => expect(response.status).toBe(200))

    .catch(fail);
});

// Ping: Hypixel //
test('GET - Ping (mc.hypixel.net)', () => {
    return request(environment.TEST.URL)

    .get(environment.TEST.PING.HYPIXEL)

    .then(response => expect(response.status).toBe(200))

    .catch(fail);
});