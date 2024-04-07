import { prisma } from "../db";
import express, { Request, Response, NextFunction } from 'express';
import { assert } from 'superstruct';
import { BookCreationData } from '../validation/book';
import { BookUpdateData } from '../validation/book';
import { Prisma } from "@prisma/client";
import { log } from "console";
import { HttpError } from "../error";


export async function get_all(req: Request, res: Response) {
  const { title, skip, take } = req.query
  const assoc: Prisma.BookInclude = {
    author: {
      select: { id: true, firstname: true,lastname: true },
    },
    tags : {
      select : {name:true},
    },
    comments : {
      select : {userId : true, content:true, bookId:true}
    }
  };
  const filter: Prisma.BookWhereInput = {};
  if(title){
    filter.title={contains: String(title)}
  }

    const books=await prisma.book.findMany({
      where : filter,
      include : assoc,
      orderBy : {
        title : 'asc'
      },
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined
    });   
    const bookCount = await prisma.book.count({ where: filter });
    res.header('X-Total-Count', String(bookCount));
    res.json(books);  
};


export async function get_one(req: Request, res: Response) {
  const assoc: Prisma.BookInclude = {
    author: {
      select: { id: true, firstname: true,lastname: true },
      
    },
    tags : {
      select : {name:true},
    },
    comments : {
      select : {userId : true, content:true, bookId:true}
    }
  };
    const book = await prisma.book.findUnique({
        where: {
          id: Number(req.params.book_id),
        },
        include : assoc,
      })
    if(book==null) {
        res.status(404).send(' 404 Author not found');
    }
    else {
        res.status(200).json(book);
    }
};

export async function get_all_of_author(req: Request, res: Response) {
  const { title }: { title?: string } = req.query
    const book = await prisma.book.findMany({
        where: {
          authorId: Number(req.params.author_id),
          title : { contains : title || undefined }
        },
        orderBy : {
          title : 'asc'
        }
      })
    if(book==null) {
        res.status(404).send(' 404 Author not found');
    }
    else {
        res.status(200).json(book);
    }
};

export async function create_one_of_author(req: Request, res: Response) {
  assert(req.body, BookCreationData);
  const book = await prisma.book.create({
    data: {
      ...req.body,
      author: {
        connect: {
          id: Number(req.params.author_id)
        }
      }
    }
  });
  res.status(201).json(book);
};



export async function update_one(req: Request, res: Response) {
  assert(req.body, BookUpdateData);
  try {
    const book = await prisma.book.update({
      where: {
        id: Number(req.params.book_id)
      },
      data: req.body
    });
    res.json(book);
  }
  catch (err) {
    throw new HttpError('Book not found', 404);
  }
};


export async function delete_one(req: Request, res: Response) {
  try {
    await prisma.book.delete({
      where: {
        id: Number(req.params.book_id)
      }
    });
    res.status(204).send();
  }
  catch (err) {
    throw new HttpError('Book not found', 404);
  }
};
