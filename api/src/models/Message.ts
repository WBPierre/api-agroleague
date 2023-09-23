import {db} from "../../config/database";

import {DataTypes, ModelDefined, Optional} from "sequelize";

type MessageAttributes = {
    id: number;
    text: string;
    topic_id: number;
    user_id: number;
}

type MessageCreationAttributes =  Optional<MessageAttributes, 'id'>;


export const Message: ModelDefined<MessageAttributes, MessageCreationAttributes> =
    db.define(
        "message",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            text: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.INTEGER,
                references:{
                    model: {tableName: 'user'},
                    key: 'id'
                }
            },
            topic_id: {
                type: DataTypes.INTEGER,
                references:{
                    model: {tableName: 'topic'},
                    key: 'id'
                }
            }
        },
        {
            timestamps: true,
        }
    );