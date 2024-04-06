import React, {useEffect, useState} from "react";
import { Outlet } from "react-router-dom";
import { Pagination } from "../utils/pagination";
import { NavLink } from "react-router-dom";
import { Book, Tag } from "../types";
import { get_books, delete_book, get_tags } from "../api";


export function Books(){
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const [query, setSearchQuery] = useState<string>("");
    const [books, setBooks] = useState<Book[]>([]);

    const pagesize=8;

    async function loadBooks(){
        setLoading(true);
        const response = await get_books({page: currentPage, pageSize: pagesize, title: query});

        if (response) {
            const { books_, totalBooks } = response;
            setBooks(books_);
            setTotalElements(totalBooks ? parseInt(totalBooks) : 0);
        } else {
            // Handle the case where response is undefined
            setBooks([]);
            setTotalElements(0);
        }
        setLoading(false);
        console.log(books)
    }

    useEffect(() => {
        loadBooks()
    }
    ,[currentPage, query]);

    const handleFilter = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        setSearchQuery(query => form.search.value);
    }

    function onPageChange(page: number){
        setCurrentPage(current => page)
    }

    async function removeItem(id: number){
        await delete_book(id);
        loadBooks()
    }

    function handleDelete(id:number){
        try
        {removeItem(id);}
        catch(error){
            setError(error=>error)
        }
    }

    return(
        <div id="container">
            <div id="sidebar">
                <p>{loading ? "Loading..." : ""}</p>                
                <div>
                    <h2>Rechercher un livre</h2>
                    <form onSubmit={handleFilter}>
                        <h3>Filter</h3>
                        <label>
                            Title : <input name="search" />
                        </label>
                        <button type="submit">Search</button>
                    </form>
                    <Pagination
                        page={currentPage}
                        pageSize={pagesize}
                        total={totalElements}
                        onPageChange={onPageChange}
                    />
                    <ul>
                        {books.map((book) => (
                            <li key={book.id}>
                                <NavLink to={`/books/${book.id}`}>
                                    #{book.id} - {book.title} {book.publication_year}
                                </NavLink>
                                <button className='small danger' onClick={() => handleDelete(book.id)}>
                                    <small>Remove</small>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div id="info">
                <Outlet />
            </div>
        </div>
    )
}