import { Request, Response } from 'express';
import { userRepository } from '../repositories/UserRepository';
import { BadRequestError, UnauthorizedError } from '../helpers/api-erros';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config';

export class GetProfileController {
    async getProfile(req: Request, res: Response) {
        return res.json(req.user);
    }
}
