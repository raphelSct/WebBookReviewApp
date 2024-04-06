import { prisma } from "../db";
import express, { Request, Response, NextFunction } from 'express';
import { Prisma } from "@prisma/client";
import { assert, string } from 'superstruct';
import { number, refine } from 'superstruct'
const Positive = refine(number(), 'positive', (value) => value >= 0)
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
import { expressjwt, Request as AuthRequest } from 'express-jwt';


export const auth_client = [
    expressjwt({
      secret: process.env.JWT_SECRET as string,
      algorithms: ['HS256'],
    }),
    async (req: AuthRequest, res: Response, next: NextFunction) => {
      const user = await prisma.user.findUnique({
        where: { 
            id: Number(req.auth?.userId)}
      });
      if (user) {
        req.auth = user;
        next();
      } else {
        res.status(401).send('Invalid token');
      }
    }
  ];
  

export async function create(req: Request, res: Response) {
    const users= await prisma.user.create({
        data: {
            username: req.body.username,
            email : req.body.email,
            password : await bcrypt.hash(req.body.password,10)
        }
    })        
    const user = { ...req.body };
    delete user.password;  
    res.status(201).json({user}); 
};

export async function signin(req: Request, res: Response) {
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username,
            email: req.body.email
        },
      })

    const Email = refine(string(),'Email' ,(value: string) => {
        // Validation de l'adresse e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            throw new Error('Adresse e-mail invalide');
        }
        return value.toLowerCase();
    });
    const Password = refine(string(),'password' ,(value: string) => {
        // Validation de l'adresse e-mail
        
        if (value.length<8) {
            throw new Error('Adresse e-mail invalide');
        }
        return value
    });
    Password
    Email 
    if(user==null) {
        res.status(404).send(' 404 Author not found');
    }
    else {
        if(bcrypt.compare(req.body.password, user.password)){
            const userNoPsswd = { ...req.body };
            delete userNoPsswd.password; 
            res.status(200).json({
                userNoPsswd,
                token: jwt.sign(
                    { userId: user.id },
                    "RANDOM_TOKEN_SECRET",
                    { expiresIn: '24h' }
                )
            });
        }
        const tok=process.env.JWT_SECRET
        res.status(200).json({user,tok});
    }
};