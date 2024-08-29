import { Request, Response } from 'express';
import { userRepository } from '../repositories/UserRepository';
import { BadRequestError } from '../helpers/api-erros';
import bcrypt from 'bcrypt';

export class UserController {
    async create(req: Request, res: Response) {
        const { name, email, password } = req.body;

        const existingUser = await userRepository.findOneBy({ email });

        if (existingUser) {
            throw new BadRequestError('Email already exists');
        }

        const hashPass = await bcrypt.hash(password, 10);

        const newUser = userRepository.create({
            name,
            email,
            password: hashPass,
        }); 
        await userRepository.save(newUser);

        const { password: _, ...user } = newUser;

        return res.status(201).json(user);
    }
}
