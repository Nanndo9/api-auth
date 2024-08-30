import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { validateUserCredentials } from '../utils/protocols';

export class LoginController {
    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        const userLogin = await validateUserCredentials(email, password);

        const token = jwt.sign(
            { id: userLogin.id },
            process.env.JWT_PASS as string,
            {
                expiresIn: '2h',
            }
        );

        const { password: _, ...loginUser } = userLogin;
        return res.json({
            user: loginUser,
            token: token,
        });
    }
}