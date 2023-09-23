import {describe, expect, it} from '@jest/globals';
import {hashPassword, verifyPassword} from "../src/utils/password";

describe('Testing generic functions', ():void => {
	it('Verify password generation', async ():Promise<void> => {
		const password: string = "testPassword";
		const hash: string = await hashPassword(password);
		expect(await verifyPassword(password, hash)).toEqual(true);
	})
})
