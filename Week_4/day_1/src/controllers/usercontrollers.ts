import {Request, Response} from 'express';
import prisma from '../libs/prisma';

export const helloWorld = (req: Request, res: Response) => {
    return res.json({
        message: 'Hello World'
    });
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        const newUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: password
            },
        });
    
        return res.status(201).json({
            message: 'User created successfully',
            data: newUser,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Failed to create user!',
            error: error,
        });
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const {search, minPrice, sortBy} = req.query;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit
        const users = await prisma.user.findMany({
            where: {
                name: {
                    contains: search as string,
                    mode: 'insensitive'
                }
            },
            take: limit,
            skip: skip,
            orderBy: {
                createdAt: sortBy === 'oldest' ? 'asc' : 'desc'
            },
        });

        if (!users){
            return res.status(404).json({
                message: 'No such user found',
            });
        }       

        const total_data = await prisma.user.count();

        return res.status(200).json({
            message: 'Users retrieved successfully',
            meta: {
                current_page: page,
                limit: limit,
                total_data: total_data,
                total_pages: Math.ceil(total_data / limit)
            },
            data: users,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Failed to retrieve users!',
            error: error,
        });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const product = await prisma.user.findUnique({
            where: {
                id: Number(id),
            },
        });
    
        if (!product) {
            return res.status(404).json({
                message: 'Product not found',
            });
        }

        return res.status(200).json({
            message: 'Product retrieved successfully',
            data: product,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Failed to retrieve product!',
            error: error,
        });
    }
};