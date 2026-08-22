import type { Request, Response } from "express";
import prisma from "../lib/prisma.js";


export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await prisma.product.findMany();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
}

export const addProducts = async (req: Request, res: Response) => {
    try {
        const { name, image, description } = req.body;
        if (!name || !image || !description) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const product = await prisma.product.create({
            data: {
                name,
                image,
                description
            }
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: "Failed to create product" });
    }
}

export const editProducts = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, image, description } = req.body;
        const product = await prisma.product.update({
            where: { id: id as string },
            data: {
                name,
                image,
                description
            }
        });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: "Failed to update product" });
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await prisma.product.delete({
            where: { id: id as string }
        });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: "Failed to delete product" });
    }
}
