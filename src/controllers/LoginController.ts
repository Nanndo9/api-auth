import { Request, Response } from 'express';
import { userRepository } from '../repositories/UserRepository';
import { BadRequestError } from '../helpers/api-erros';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config';

export class LoginController {
    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        const userLogin = await userRepository.findOneBy({ email });

        if (!userLogin) {
            throw new BadRequestError('Invalid email or password');
        }
        const verifyPass = await bcrypt.compare(password, userLogin.password);

        if (!verifyPass) {
            throw new BadRequestError('Invalid email or password');
        }
        const token = jwt.sign( 
            { id: userLogin.id },
            process.env.JWT_PASS as string,
            {
                expiresIn: '2h',
            }
        );

        const {password:_,...loginUser} = userLogin
        return res.json({
            user:loginUser,
            token:token
        })
    }
}
