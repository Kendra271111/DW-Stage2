import {Request, Response} from 'express';

export const helloWorld = (req: Request, res: Response) => {
    return res.json({
        message: 'Hello World'
    });
}

export const getProfile = (req: Request, res: Response) => {
    return res.json({
        id: 1,
        name: 'Kena',
        email: 'Kena@gmail.com'
    });
};

export const getUserByName = (req: Request, res: Response) => {
    const { name } = req.params;

    return res.json({
        message: `User ${name} retrieved successfully`,
    });
}

export const createUser = (req: Request, res: Response) => {
    const {name, email} = req.body;
    return res.status(201).json({
        message: 'User created successfully',
        data: {
            name,
            email
        }
    });
}