import {beforeAll, describe, expect, it, jest} from '@jest/globals';
import {server} from "../index";
import request from "supertest";

describe('Act like an admin user', ():void => {

    let token:any = null;
    let user:any = null;

    beforeAll(async ():Promise<void> => {
        const res:request.Response = await request(server).post('/api/auth')
            .send({
                email: "admin@agro-league.com",
                password: "admin"
            })
        token = res.body.token;
        user = res.body.user;
    })


    it('Try to login', async ():Promise<void> => {
        const res:request.Response = await request(server).post('/api/auth')
            .send({
                email: "admin@agro-league.com",
                password: "admin"
            })
        expect(res.statusCode).toEqual(200);
    })

    it('Try to get User information', ():void => {
        expect(user.firstname).toBe("Admin")
        expect(user.lastname).toBe("Agro-League")
        expect(user.email).toBe("admin@agro-league.com")
        expect(user.role).toBe("admin")
    })

    it('Try to update admin', async ():Promise<void> => {
        let res:request.Response = await request(server).put('/api/users')
            .set('Authorization', `Bearer ${token}`)
            .send({
                id: user.id,
                firstname: "Antoine"
            })
        expect(res.statusCode).toEqual(200);
        expect(res.body.firstname).toBe("Antoine");
    })

    it('Get users', async ():Promise<void> => {
        let res:request.Response = await request(server).get('/api/users')
            .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toEqual(200);
    })

    it('Get conversations', async ():Promise<void> => {
        let res:request.Response = await request(server).get('/api/conversations')
            .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toEqual(200);
    })
})
