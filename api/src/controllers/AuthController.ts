import {Request, Response, NextFunction} from "express";
import {UserModel} from "../models";
import {Op} from "sequelize";
import {verifyPassword} from "../utils/password";
import {populateToken, verifyToken} from "../utils/tokenUtils";

export const login = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
	const {email, password} = req.body

	try {

		let user: any = await UserModel.findOne({
			where: {
				email,
				status: 'active',
				role: {[Op.or]: ['admin', 'user']},
			},
		});

		if (!user || !await verifyPassword(password, user.password)) {
			return res.status(401).send('Invalid credentials');
		}

		user = {
			...user.toJSON()
		};

		delete user.password;

		const token = populateToken({
			id: user.id,
			email: user.email,
			lastname: user.lastname,
			firstname: user.firstname,
		}, res);

		if (!token) {
			return res.status(401).send("Error sign jwt");
		}

		return res.status(200).json({user, token});
	} catch (e) {
		return next(e);
	}
}


export const verifyUser = async function (req: Request, res: Response, next: NextFunction): Promise<Response> {
	const user = verifyToken(req);

	if (user === null) {
		return res.status(401).send('Session expired');
	}

	return res.status(200).json(user);
}
