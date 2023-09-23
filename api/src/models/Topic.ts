import {db} from "../../config/database";

import {DataTypes, ModelDefined, Optional} from "sequelize";

type TopicAttributes = {
    id: number;
    user_id: number;
    status: string;
}

type TopicCreationAttributes =  Optional<TopicAttributes, 'id' | 'status'>;


export const Topic: ModelDefined<TopicAttributes, TopicCreationAttributes> =
    db.define(
        "topic",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            user_id: {
                type: DataTypes.INTEGER,
                references:{
                    model: {tableName: 'user'},
                    key: 'id'
                },
                allowNull: false
            },
            status: {
                type: DataTypes.STRING,
                defaultValue: "pending",
                validate: {
                    isIn: [['pending', 'active', 'archived']]
                }
            },
        },
        {
            timestamps: true,
        }
    );