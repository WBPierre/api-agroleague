import {NextFunction, Request, Response} from "express";
import {MessageModel, TopicModel, UserModel} from "../models";
import {topicToMessage} from "../models/associations";
import {WhereType} from "../types/IWhere";

export const getConversations = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const {user} = req;
    let where = {};
    try {

        if(user && user.role !== "admin") {
            where = {
                user_id: user.id
            }
        }

        const conversations = await TopicModel.findAll({
            where,
            include: [
                {
                    association: topicToMessage
                }
            ],
            order: [['created_at', 'DESC']]
        })

        return res.status(200).json(conversations);

    } catch (e) {
        return next(e);
    }
}



export const getConversation = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const {id} = req.params;
    const {user} = req;
    let where: WhereType = {
        id
    }

    try {

        if(user && user.role !== "admin") {
            where = {
                ...where,
                user_id: user.id
            }
        }

        const conversation = await TopicModel.findOne({
            where,
            include: [
                {
                    association: topicToMessage,
                    order: [['created_at', 'ASC']]
                }
            ]
        })

        return res.status(200).json(conversation);

    } catch (e) {
        return next(e);
    }
}

export const updateConversation = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const {id} = req.params;
    const {user} = req;
    try {
        if(!user){
            return res.status(404).end();
        }

        if(user.role !== "admin"){
            return res.status(403).end();
        }

        const topic = await TopicModel.findOne({
            where:{
                id
            }
        });

        if(!topic) {
            return res.status(404).end();
        }

        await topic.update(req.body);

        return res.status(200).send();

    } catch (e) {
        return next(e);
    }
}

export const sendMessage = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const {id, message} = req.body;
    const {user} = req;
    let topic:any = null;

    try {

        if(!user){
            return res.status(404).end();
        }


        if(!id){
            topic = await TopicModel.create({
                user_id: user.id
            })
        }else{
            topic = await TopicModel.findOne({
                where:{
                    id
                }
            });

            if(!topic){
                return res.status(404).end();
            }
        }

        await MessageModel.create({
            text: message,
            user_id: user.id,
            topic_id: topic.id
        })

        if(user.role === "admin" && topic.status === "pending") {
            await topic.update({status: "active"});
        }

        return res.status(201).json({topic_id: topic.id});

    } catch (e) {
        return next(e);
    }
}

