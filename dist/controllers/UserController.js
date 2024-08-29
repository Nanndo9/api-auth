"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserRepository_1 = require("../repositories/UserRepository");
const api_erros_1 = require("../helpers/api-erros");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserController {
    async create(req, res) {
        const { name, email, password } = req.body;
        const existingUser = await UserRepository_1.userRepository.findOneBy({ email });
        if (existingUser) {
            throw new api_erros_1.BadRequestError('Email already exists');
        }
        const hashPass = await bcrypt_1.default.hash(password, 10);
        const newUser = UserRepository_1.userRepository.create({
            name,
            email,
            password: hashPass,
        });
        await UserRepository_1.userRepository.save(newUser);
        const { password: _, ...user } = newUser;
        return res.status(201).json(user);
    }
}
exports.UserController = UserController;
