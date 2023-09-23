import {describe, expect, it} from '@jest/globals';
import {server} from "../config/server";
import request from "supertest";

describe('Check server Health', ():void => {
    it('Server should be healthy', async ():Promise<void> => {
        const res:request.Response = await request(server).get('/api/health');
        expect(res.statusCode).toEqual(200);
    })
});

describe('Server should return 403', ():void => {
    it('Try accessing users', async ():Promise<void> => {
        const res:request.Response = await request(server).get('/api/users');
        expect(res.statusCode).toEqual(403);
    })

    it('Try accessing conversations', async ():Promise<void> => {
        const res:request.Response = await request(server).get('/api/conversations');
        expect(res.statusCode).toEqual(403);
    })

    it('Try sending a message', async ():Promise<void> => {
        const res:request.Response = await request(server).post('/api/conversations').send({id: 1, message: 'TEST'});
        expect(res.statusCode).toEqual(403);
    })

    it('Try updating a user', async ():Promise<void> => {
        const res:request.Response = await request(server).put('/api/users').send({id:1, firstname: 'toto'});
        expect(res.statusCode).toEqual(403);
    })
})

