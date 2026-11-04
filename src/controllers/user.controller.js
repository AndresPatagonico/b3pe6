import { UserService } from '../services/user.service.js';

const userService = new UserService();

export class UserController {
    static async getUsers(req, res, next) {
        try {
            const users = await userService.getUsers();
            return res.status(200).json({ status: 'success', payload: users });
        } catch (error) {
            next(error);
        }
    }

    static async createUser(req, res, next) {
        try {
            const newUser = await userService.createUser(req.body);
            return res.status(201).json({ status: 'success', payload: newUser });
        } catch (error) {
            next(error);
        }
    }
}