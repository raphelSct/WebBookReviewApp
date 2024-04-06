import { prisma } from "../db";
import express, { Request, Response, NextFunction } from 'express';
import { expressjwt, Request as AuthRequest } from 'express-jwt';
import { Prisma } from "@prisma/client";
import { assert } from 'superstruct';
import { TagCreationData } from '../validation/tag';
import { TagUpdateData } from '../validation/tag';
const jwt = require('jsonwebtoken');


export async function get_all_from_one(req: Request, res: Response) {
    const comment= await prisma.comment.findMany({
        where: {
            bookId: Number(req.params.book_id)
          },
        
    })          
    res.status(201).json({comment}); 
};



export async function create_one(req: AuthRequest, res: Response) {
    const book_id = Number(req.params.book_id);
    const comment  = req.body.content.toString();
    try{
        // Création du nouveau commentaire associé au livre avec l'ID de l'utilisateur authentifié
        const newComment = await prisma.comment.create({
            data: {
                bookId : book_id,
                userId: req.auth?.id,
                content: comment,
                created_at: new Date(),
                updated_at: new Date(),
            }
        });

        // Envoyer le nouveau commentaire créé au format JSON dans la réponse
        res.status(201).json({ newComment });
    } catch (error) {
        console.error('Erreur lors de la création du commentaire :', error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la création du commentaire' });
    }
}
    



