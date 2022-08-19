import {Request,Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
export const SECRET_KEY ="thotrang";
export const auth = (req,res:Response,next:NextFunction) =>{

    let authorization = req.headers.authorization;
    if(!authorization){
        res.status(401).json({
            message:"you is anonimous"
        })
    }else{
        let accessToken = authorization.split(' ')[1];
        jwt.verify(accessToken,SECRET_KEY,(err,data)=>{
            if(err){
                res.status(401).json({
                    message:"you is anonimous"
                })
            }else{
                req.decoded =data;
                console.log(data);
                next();
            }
        })
    }
}
export const checkAdmin = (req,res,next) => {
    let role = req.decoded.role;
    for(let i=0;i<role.length;i++){
        if(role[i].name == 'admin'){
            next()
        }else{
            res.status(401).json({
                message:'you not permison'
            })
        }
    }
    res.status(401).json()
}