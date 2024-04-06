import { prisma } from "../db";
import express, { Request, Response, NextFunction } from 'express';
import { expressjwt, Request as AuthRequest } from 'express-jwt';
import { Prisma } from "@prisma/client";
import { assert } from 'superstruct';
import { TagCreationData } from '../validation/tag';
import { TagUpdateData } from '../validation/tag';



export async function get_all_from_one(req: Request, res: Response) {
    const rating= await prisma.rating.findMany({
        where: {
            bookId: Number(req.params.book_id)
          },
        
    })          
    res.status(201).json({rating}); 
};

export async function create_one(req: AuthRequest, res: Response) {
    const book_id = Number(req.params.book_id);
    const value  = Number(req.body.value);
    try{
        // Création du nouveau commentaire associé au livre avec l'ID de l'utilisateur authentifié
        const newRating = await prisma.rating.create({
            data: {
                bookId : book_id,
                userId: req.auth?.id,
                value: value,
            }
        });

        // Envoyer le nouveau commentaire créé au format JSON dans la réponse
        res.status(201).json({ newRating });
    } catch (error) {
        console.error('Erreur lors de la création du commentaire :', error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la création du commentaire' });
    }
}


export async function get_average(req: Request, res: Response) {
    const ratings= await prisma.rating.findMany({
        where: {
            bookId: Number(req.params.book_id)
          },
        
    })  
    const count = await prisma.rating.count({
        where: {
        bookId: Number(req.params.book_id)
      },})
    let average=0;
    for (const rate of ratings){
        average += rate.value;
    }   
    average =average / count;
    res.status(201).json({average}); 
};

