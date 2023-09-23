import {db} from "../../config/database";

import {DataTypes, ModelDefined, Optional} from "sequelize";

type UserAttributes = {
	id: number;
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	status: string;
	token: string;
	role: string;
}

type UserCreationAttributes = Optional<UserAttributes, 'id' | 'status' | 'token' | 'role'>;


export const User: ModelDefined<UserAttributes, UserCreationAttributes> =
	db.define(
	"user",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		// Model attributes are defined here
		firstname: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		lastname: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		email: {
			type: DataTypes.STRING,
			defaultValue: '',
			allowNull: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		status: {
			type: DataTypes.STRING,
			defaultValue: "pending",
			validate: {
				isIn: [['pending', 'active', 'archived']]
			}
		},
		token: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		role: {
			type: DataTypes.STRING,
			defaultValue: 'user',
			validate: {
				isIn: [['user', 'host', 'admin']]
			}
		},
	},
		{
			timestamps: true,
		}
	);