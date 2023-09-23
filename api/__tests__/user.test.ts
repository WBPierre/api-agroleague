import {beforeAll, describe, expect, it, jest} from '@jest/globals';
import {server} from "../index";
import request from "supertest";

describe('Act like a default user', (): void=> {

    let token:any = null;
    let user:any = null;

    beforeAll(async ():Promise<void> => {
        const res:request.Response = await request(server).post('/api/auth')
            .send({
                email: "pierre@agro-league.com",
                password: "user"
            })
        token = res.body.token;
        user = res.body.user;
    })


    it('Try to login', async ():Promise<void> => {
        const res:request.Response = await request(server).post('/api/auth')
            .send({
                email: "pierre@agro-league.com",
                password: "user"
            })
        expect(res.statusCode).toEqual(200);
    })

    it('Try to get User information', ():void => {
        expect(user.firstname).toBe("Pierre")
        expect(user.lastname).toBe("Delmer")
        expect(user.email).toBe("pierre@agro-league.com")
        expect(user.role).toBe("user")
    })

    it('Try to update user', async ():Promise<void> => {
        let res:request.Response = await request(server).put('/api/users')
            .set('Authorization', `Bearer ${token}`)
            .send({
                id: user.id,
                firstname: "Antoine"
            })
        expect(res.statusCode).toEqual(200);
        expect(res.body.firstname).toBe("Antoine");
    })

    it('Get conversations', async ():Promise<void> => {
        let res:request.Response = await request(server).get('/api/conversations')
            .set('Authorization', `Bearer ${token}`)

        expect(res.statusCode).toEqual(200);
    })

    it('Send a message', async ():Promise<void> => {
        let res:request.Response = await request(server).post('/api/conversations')
            .set('Authorization', `Bearer ${token}`)
            .send({
                message: "I just created a conversation"
            })

        expect(res.statusCode).toEqual(201);
    })
})
