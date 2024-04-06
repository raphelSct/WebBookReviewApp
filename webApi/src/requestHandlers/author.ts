import { prisma } from "../db";
import express, { Request, Response, NextFunction } from 'express';
import { assert, integer } from 'superstruct';
import { AuthorCreationData } from '../validation/author';
import { AuthorUpdateData } from '../validation/author';
import { Prisma } from "@prisma/client";



export async function get_all(req: Request, res: Response) {
  const AuthorCount = await prisma.author.count()
  const { hasBooks } = req.query;
  const { lastname }: { lastname?: string } = req.query

  const assoc: Prisma.AuthorInclude = {
    books: {
      select: { id: true, title: true },
      orderBy: { title: 'asc' } 
    }
  };
    const filter: Prisma.AuthorWhereInput = {};
    if (hasBooks === 'true') {
        filter.books = {
            some: {} // Filtre pour récupérer les auteurs ayant au moins un livre associé
        };
    }
    if(req.query.lastname){
      filter.lastname = { contains : lastname || undefined }
    }

  const authors = await prisma.author.findMany({
    
    where : filter, //lastname : { contains : lastname || undefined },
    include :{
      //assoc,        MAIS QUE SI ON ENLEVE LE RESTE EN DESSOUS 
      books : {
        select : {
          id : true,
          title : true},
          orderBy : {
            title : 'asc'
          },
    }},
    orderBy : {
      lastname : 'asc'
    }
  });
  res.set({integer:AuthorCount});
  res.json(authors);
};

export async function get_one(req: Request, res: Response) {
    const author = await prisma.author.findUnique({
        where: {
          id: Number(req.params.author_id),
        },
      })
    if(author==null) {
        res.status(404).send(' 404 Author not found');
    }
    else {
        res.status(200).json({author});
    }
};

export async function create_one(req: Request, res: Response) {
    assert(req.body, AuthorCreationData);
    const authors= await prisma.author.create({
        data : {
            firstname : 'Agatha',
            lastname : 'Christhie',
        }
    })          
    res.status(201).json({authors}); 
};


export async function update_one(req: Request, res: Response) {
    assert(req.body, AuthorUpdateData);
    const authorUpdate = await prisma.author.update({
        where: {
          id : Number(req.params.author_id),
        },
        data: {
          firstname: 'Victor',
          lastname: 'Hugo',
        },
      })
    assert(authorUpdate, AuthorCreationData);
    res.status(201).json({authorUpdate});
};

export async function delete_one(req: Request, res: Response) {
    const deleteAuthor = await prisma.author.delete({
        where: {
          id : Number(req.params.author_id),
        },
      })
    res.status(204).json({deleteAuthor}); 
};
  