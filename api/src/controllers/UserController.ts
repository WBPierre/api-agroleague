import { Request, Response, NextFunction } from 'express';
import {UserModel} from "../models";
import {hashPassword} from "../utils/password";

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
	try {
		const users = await UserModel.findAll();

		return res.status(200).json(users);

	} catch (e) {
		return next(e);
	}
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
	const {id} = req.params;
	const {user} = req;

	if (user && user.role !== 'admin' && parseInt(id, 10) !== user.id) {
		return res.status(403).end();
	}

	try {
		const record = await UserModel.findOne({
			where: {id},
			attributes: {
				exclude: ['password'],
			}
		});

		if (!record) {
			return res.status(404).end();
		}

		return res.json(record);

	} catch (e) {
		return next(e);
	}
}

export const createUser = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
	const {firstname, lastname, email, password, status, role} = req.body;
	const {user} = req;

	try {

		const record = await UserModel.findOne({
			where:{
				email
			}
		});

		if(record){
			return res.status(401).json({message: 'Account already exists'});
		}

		await UserModel.create(user && user.role === "admin" ? req.body : {
			firstname,
			lastname,
			email,
			password: await hashPassword(password)
		});

		return res.status(201).send();

	} catch (e) {
		return next(e);
	}
}

export const updateUser = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
	const {id, firstname, lastname, email, status, role} = req.body;
	const {user} = req;
	let where = {};

	if(!id) {
		return res.status(401).end();
	}

	try {

		if(user && user.role !== "admin") {
			where = {
				id: user.id
			}
		} else {
			where = {
				id
			}
		}

		const record = await UserModel.findOne({
			where
		});

		if(!record){
			return res.status(404).end();
		}

		await record.update(user && user.role === "admin" ? req.body : {
			firstname,
			lastname,
			email
		});

		return res.status(200).json(record);

	} catch (e) {
		return next(e);
	}
}

export const updatePassword = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
	const {password} = req.body;
	const {user} = req;

	try {

		if(!user) {
			return res.status(403).end();
		}

		const record = await UserModel.findOne({
			where: {
				id: user.id
			}
		});

		if(!record){
			return res.status(404).end();
		}

		await record.update({
			password: await hashPassword(password)
		});

		return res.status(200).send();

	} catch (e) {
		return next(e);
	}
}
