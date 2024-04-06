import express, { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import * as author from './requestHandlers/author';
import * as book from './requestHandlers/book';
import * as tag from './requestHandlers/tag';
import * as user from './requestHandlers/user';
import * as comment from './requestHandlers/comment';
import * as ratings from './requestHandlers/ratings';
import { StructError } from 'superstruct';
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const app = express();
const port = 3000;


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use(express.json());

app.get('/authors', author.get_all);

app.get('/authors/:author_id', author.get_one);

app.post('/authors',  author.create_one);

app.patch('/authors/:author_id',  author.update_one); 
    
app.delete('/authors/:author_id', author.delete_one);   

//########## Books ############# //

app.get('/books',book.get_all);

app.get('/books/:book_id',book.get_one);

app.get('/authors/:author_id/books',book.get_all_of_author);

app.post('/authors/:author_id/books', book.create_one_of_author);

app.patch('/books/:book_id', book.update_one); 
    
app.delete('/books/:book_id', book.delete_one); 

//########## Tags ############# //

app.get('/tags',tag.get_all);

app.get('/tags/:tag_id',tag.get_one);

app.get('/books/:book_id/tags',tag.get_all_of_book);

app.post('/tags', tag.create_one);

app.patch('/tags/:tag_id', tag.update_one); 
    
app.delete('/tags/:tag_id', tag.delete_one); 

app.post('/books/:book_id/tags/:tag_id', tag.connect); 
    
app.delete('/books/:book_id/tags/:tag_id', tag.disconnect);

//########## Users & Co ############# //


app.post('/signup',user.create);
app.post('/signin',user.signin);

app.get('/books/:book_id/comments', comment.get_all_from_one);
app.post('/books/:book_id/comments',user.auth_client, comment.create_one);

app.get('/books/:book_id/ratings',ratings.get_all_from_one);
app.post('/books/:book_id/ratings',user.auth_client,ratings.create_one);


app.get('/books/:book_id/ratings/average',ratings.get_average);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof StructError) {
    err.status = 400;
  }

  res.status(500).send(err.message);
});






