import { prisma } from "../db";
import express, { Request, Response, NextFunction } from 'express';
import { assert } from 'superstruct';
import { TagCreationData } from '../validation/tag';
import { TagUpdateData } from '../validation/tag';



export async function get_all(req: Request, res: Response) {
    const tags = await prisma.tag.findMany();
    res.json(tags);
};

export async function get_one(req: Request, res: Response) {
    const tag = await prisma.tag.findUnique({
        where: {
          id: Number(req.params.tag_id),
        },
      })
    if(tag==null) {
        res.status(404).send(' 404 Author not found');
    }
    else {
        res.status(200).json({tag});
    }
};

export async function get_all_of_book(req: Request, res: Response) {
    const tags = await prisma.tag.findMany({
        where: {
          books: {
            some:{
                id:Number(req.params.book_id),
            }
          }
        },
      })
    if(tags==null) {
        res.status(404).send(' 404 Author not found');
    }
    else {
        res.status(200).json({tags});
    }
};

export async function create_one(req: Request, res: Response) {
    assert(req.body, TagCreationData);
    const tag= await prisma.tag.create({
        data : {
            name : 'Fantasy',
        }
    })          
    res.status(201).json({tag}); 
};


export async function update_one(req: Request, res: Response) {
    assert(req.body, TagUpdateData);
    const tagUpdate = await prisma.tag.update({
        where: {
          id : Number(req.params.tag_id),
        },
        data: {
          name: 'Horror',
        },
      })
    assert(tagUpdate, TagCreationData);
    res.status(201).json({tagUpdate});
};

export async function delete_one(req: Request, res: Response) {
    const deleteTag = await prisma.tag.delete({
        where: {
          id : Number(req.params.tag_id),
        },
      })
    res.status(204).json({deleteTag}); 
};

export async function connect(req: Request, res: Response) {
    const tag = await prisma.tag.update({
        where: {
          id : Number(req.params.tag_id),
        },
        data :{
            books :{
                connect :{
                    id : Number(req.params.book_id),
                }
            }
        }
      })
    res.status(204).json({tag}); 
};

export async function disconnect(req: Request, res: Response) {
    const tag = await prisma.tag.update({
        where: {
          id : Number(req.params.tag_id),
        },
        data :{
            books :{
                disconnect :{
                    id : Number(req.params.book_id),
                }
            }
        }
      })
    res.status(204).json({tag}); 
};
  