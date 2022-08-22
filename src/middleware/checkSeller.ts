import {Request,Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
export const SECRET_KEY ="thotrang";
export const checkAdmin = (req,res:Response,next:NextFunction) =>{

    let authorization = req.headers.authorization;
    if(!authorization){
        res.status(401).json({
            message:"you is anonymous"
        })
    }else{
        let accessToken = authorization.split(' ')[1];
        jwt.verify(accessToken,SECRET_KEY,(err,data)=>{
            if(err){
                res.status(401).json('you is anonymos')
            }else{
                req.decoded = data;
                let roles = req.decoded.role
                for(let role of roles ){
                    if(role.name =='seller'){
                        next();
                    }else{
                        res.status(401).json('you is anonymos')
                    }
                }

            }
        })
    }
}
