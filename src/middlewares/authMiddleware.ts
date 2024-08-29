import { NextFunction, Request, Response } from 'express';
import { BadRequestError, UnauthorizedError } from '../helpers/api-erros';
import { userRepository } from '../repositories/UserRepository';
import jwt from 'jsonwebtoken';
type JwtPayLoad = {
    id: number;
};

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { authorization } = req.headers;

    if (!authorization) {
        throw new UnauthorizedError('unauthorized');
    }
    const token = authorization.split(' ')[1];

    const { id } = jwt.verify(
        token,
        process.env.JWT_PASS as string
    ) as JwtPayLoad;

    const userId = await userRepository.findOneBy({ id });
    if (!userId) {
        throw new BadRequestError('Unauthorized');
    }

    const { password: _, ...loggedUser } = userId;
    req.user = loggedUser;
    next();
};
