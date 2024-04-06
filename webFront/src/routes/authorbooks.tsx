import React, { useEffect, useState } from 'react';
import { Author, Book, BookCreationData } from '../types';
import { get_books_of_author, add_book, delete_book } from '../api';
import { NavLink } from 'react-router-dom';


export function AuthorBooks(author : Author) {
    const [books, setBooks] = useState<Book[]>([]);
    const [error, setError] = useState<String>("");
    const [loading, setLoading] = useState<boolean>(false);

    // console.log(author);

    async function loadBooks() {
        if (author) {
            setLoading(true);
            const temp = await get_books_of_author(author);
            console.log(temp);
            setBooks(temp);
            setLoading(false);
        }
    }

    useEffect(() => {
        loadBooks();
    }, [author]);

    if (!author) {
        return (
            <div>
                <h2>Author not found ...</h2>
            </div>
        );
    }

    const handleAdd = async (event: React.FormEvent<HTMLFormElement>) => {
        try
        {event.preventDefault();
        const form = event.currentTarget;
        const changes: BookCreationData = {
            title: form._title.value,
            publication_year: parseInt(form.publication_year.value, 10)
            }
        await add_book(changes, author.id);
        form._title.value="";
        form.publication_year.value="";
        loadBooks();
        }
        catch(error){
            setError(error=>error)
        }
    }

    function handleDelete(id:number){
        try
        {removeItem(id);}
        catch(error){
            setError(error=>error)
        }
    }

    async function removeItem(id: number){
        await delete_book(id);
        loadBooks();
    }

    return (
        <div>
            <p>{loading ? "Loading..." : ""}</p>
            <p>{error}</p>
            <form onSubmit={handleAdd}>
                <label>
                    Title : <input name="_title"/>
                </label>
                <label>
                    Publication year : <input name="publication_year"/>
                </label>
                <button type="submit">Add</button>
            </form>
            {books.map((book) => (
                <ul key={book.id}>
                    <li>
                        <NavLink to={`/books/${book.id}`}>
                        {book.title}
                        </NavLink>
                        <button className='small danger' onClick={() => handleDelete(book.id)}>
                            <small>Remove</small>
                        </button>
                    </li>
                </ul>
            ))}
        </div>
    ); 
}