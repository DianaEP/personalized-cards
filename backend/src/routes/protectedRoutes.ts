import jwt from "jsonwebtoken";
import { Request, Response, Router } from "express"

// Protected Route 
const protectedRoutes = Router();
const SECRET_KEY = process.env.JWT_SECRET || "super_secret_key";

protectedRoutes.get("/", async(req: Request, res: Response): Promise<any> => {
    const authHeader =  req.headers.authorization;
    if(!authHeader) return res.status(401).json({message: "No token provided"});

    const token = authHeader.split(" ")[1]; // split(" ") → ["Bearer", "your_jwt_token_here"] → "your_jwt_token_here" = JWT token
    try{
        const decoded = jwt.verify(token, SECRET_KEY);
        res.json({message: "Protected data", user: decoded});

    }catch(error){
        res.status(401).json({ message: "Invalid token" });
    }
})

export default protectedRoutes;