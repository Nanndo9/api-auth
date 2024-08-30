import bcrypt from 'bcrypt';
import { userRepository } from '.././repositories/UserRepository';
import { BadRequestError } from '../helpers/api-erros';

export const validateUserCredentials = async (
    email: string,
    password: string
) => {
    const userLogin = await userRepository.findOneBy({ email });

    if (!userLogin || !(await bcrypt.compare(password, userLogin.password))) {
        throw new BadRequestError('Invalid email or password');
    }

    return userLogin;
};
