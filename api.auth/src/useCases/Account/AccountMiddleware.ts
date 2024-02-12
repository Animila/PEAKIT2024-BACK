import {Response, Request, NextFunction} from "express";
import jwt from "jsonwebtoken";
import {Roles} from "../../domains/valueObject/UserRole";

export async function checkJWT(req: Request, res: Response, next: NextFunction): Promise<void> {
   try {
       const token = req.headers.authorization?.split(' ')[1]
       if(!token) {
           res.status(401).json({message: "Пользователь не авторизован"})
           return
       }

       const {role: userRole}: any = jwt.verify(token, process.env.SECRET_JWT || 'secret')
       let hasRole = false
       console.log(userRole)
       userRole.forEach((role: any) => {
           if(["user"].includes(role)) {
               hasRole = true
           }
       })
       if(!hasRole) {
           res.status(401).json({message: "У вас нет доступа"})
           return
       }
       next()
   } catch (err: any) {
       res.status(500).json({message: err.message})
   }

}