import {Request, Response} from 'express';
import prisma from '../libs/prisma';

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, price, stock, category } = req.body;

        const newProduct = await prisma.product.create({
            data: {
                name: name,
                description: description,
                price: Number(price),
                stock: Number(stock),
                category: category,
            },
        });
    
        return res.status(201).json({
            message: 'Product created successfully',
            data: newProduct,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Failed to create product!',
            error: error,
        });
    }
};

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await prisma.product.findMany();

        return res.status(200).json({
            message: 'Products retrieved successfully',
            data: products,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Failed to retrieve products!',
            error: error,
        });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const product = await prisma.product.findUnique({
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

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, description, price, stock, category } = req.body;

        const updatedProduct = await prisma.product.update({
            where: { id: Number(id) },
            data: { 
                name, 
                description, 
                price: Number(price),
                stock: Number(stock),
                category: category
            },
        });

        return res.status(200).json({
            message: 'Product updated successfully',
            data: updatedProduct,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Failed to update product!',
            error: error,
        });
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedProduct = await prisma.product.delete({
            where: { id: Number(id) },
        });

        return res.status(200).json({
            message: 'Product deleted successfully',
            data: deletedProduct,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Failed to delete product!',
            error: error,
        });
    }
};
