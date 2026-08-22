import type { Request, Response } from "express";
import prisma from "../lib/prisma.js";


export const getServices = async (req: Request, res: Response) => {
    try {
        const services = await prisma.service.findMany();
        res.json(services);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch services" });
    }
}

export const addServices = async (req: Request, res: Response) => {
    try {
        const { name, image, description } = req.body;
        if (!name || !image || !description) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const service = await prisma.service.create({
            data: {
                name,
                image,
                description
            }
        });
        res.status(201).json(service);
    } catch (error) {
        res.status(500).json({ error: "Failed to create service" });
    }
}

export const editServices = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, image, description } = req.body;
        const service = await prisma.service.update({
            where: { id: id as string },
            data: {
                name,
                image,
                description
            }
        });
        res.json(service);
    } catch (error) {
        res.status(500).json({ error: "Failed to update service" });
    }
}

export const deleteServices = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const service = await prisma.service.delete({
            where: { id: id as string }
        });
        res.json(service);
    } catch (error) {
        res.status(500).json({ error: "Failed to delete service" });
    }
}
