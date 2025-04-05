import { Request, Response } from 'express'
import {UserService} from "../../services";
import {UserDto} from "../dto/UserDto";

export class UserController {
    protected userService: any

    constructor(userService: UserService){
        this.userService = userService;
    }

    async create(req: Request, res: Response)
    {
        const data = (new UserDto(req.body)).fromUser

        try {
            const user = await this.userService.createUser(data);
            res.status(201).json(user);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}