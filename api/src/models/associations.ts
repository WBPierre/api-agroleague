import {MessageModel, TopicModel, UserModel} from "./index";

export const userToTopic =  UserModel.hasMany(TopicModel, {foreignKey: {allowNull: false, name: "user_id"}});
export const topicToUser = TopicModel.belongsTo(UserModel, {foreignKey: {allowNull: false, name: "user_id"}});

export const topicToMessage = TopicModel.hasMany(MessageModel, {foreignKey: {allowNull:false, name: "topic_id"}});
export const messageToTopic = MessageModel.belongsTo(TopicModel, {foreignKey: {allowNull:false, name: "topic_id"}});
