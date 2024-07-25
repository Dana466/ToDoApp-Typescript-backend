import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

interface DecodedToken {
  userId: string;
}

export interface RequestWithUserId extends Request {
  user: {
    _id: string;
  };
}

const auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
  
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new Error("No token provided");
    }

    const decodedToken = jwt.verify(token, "RANDOM-TOKEN") as DecodedToken;

   
    const user = { _id: decodedToken.userId };

    // pass the user down to the endpoints
    (req as RequestWithUserId).user = user;

    next();
  } catch (error) {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};

export default auth;


