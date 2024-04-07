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
    res.status(201).json(comment); 
};

export async function create_one_without_auth(req: Request, res: Response) {
    const book_id = Number(req.params.book_id);
    const comment = req.body.content;
    const username = req.body.username; // Assurez-vous que le nom d'utilisateur est fourni dans la requête

    console.log(comment + " " + book_id + " " + username);

    try {
        const newComment = await prisma.comment.create({
            data: {
                userId: 1, // Utilisation du nom d'utilisateur fourni dans la requête
                bookId: book_id,
                content: comment,
                created_at: new Date(),
                updated_at: new Date(),  
                username: username              
            }
        });

        res.status(201).json(newComment);
        console.log(newComment);
    } catch (error) {
        console.error('Erreur lors de la création du commentaire :', error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la création du commentaire' });
    }
}



export async function create_one(req: AuthRequest, res: Response) {
    const book_id = Number(req.params.book_id);
    const comment  = req.body.content.toString();
    try{
        // Création du nouveau commentaire associé au livre avec l'ID de l'utilisateur authentifié
        const newComment = await prisma.comment.create({
            data: {
                username: req.auth?.username,
                bookId : book_id,
                userId: req.auth?.id,
                content: comment,
                created_at: new Date(),
                updated_at: new Date(),
            }
        });

        // Envoyer le nouveau commentaire créé au format JSON dans la réponse
        res.status(201).json( newComment );
    } catch (error) {
        console.error('Erreur lors de la création du commentaire :', error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la création du commentaire' });
    }
}
    



