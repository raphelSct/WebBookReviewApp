import React, { useEffect, useState } from 'react';
import { get_authors, add_authors, delete_author } from '../api';
import { NavLink, Outlet } from 'react-router-dom';
import { Author, AuthorCreationData, GetAuthorParams } from '../types';
import { Pagination } from '../utils/pagination';
import { Separator } from '@radix-ui/react-separator';
import { toast } from "sonner"

export function Authors(){
    const [authors, setAuthors] = useState<Author[]>([]);
    const [error, setError] = useState<String>("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const [query, setSearchQuery] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const pagesize = 9;


    async function loadAuthors(){
        setLoading(true);
        const { authors, totalAuthors} = await get_authors({page: currentPage, pageSize: pagesize, lastname: query});
        setAuthors(authors);
        setTotalElements(totalAuthors ? parseInt(totalAuthors) : 0);
        setLoading(false);
    }

    useEffect(() => {
            loadAuthors()
        }, [currentPage, query]);

    async function addAuthor(adc: AuthorCreationData){
        await add_authors(adc);
        loadAuthors();
    }

    async function removeItem(id: number){
        await delete_author(id);
        loadAuthors()
    }

    function handleDelete(id:number){
        try
        {removeItem(id);}
        catch(error){
            setError(error=>error)
        }
    }

    function onPageChange(page: number){
        setCurrentPage(current => page)
    }

    const handleFilter = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        setSearchQuery(query => form.search.value);
    }

    const handleAdd = async (event: React.FormEvent<HTMLFormElement>) => {
        try
        {event.preventDefault();
        const form = event.currentTarget;
        const changes: AuthorCreationData = {
            firstname: form.firstname.value,
            lastname: form.lastname.value
        };
        await addAuthor(changes);
        form.firstname.value="";
        form.lastname.value="";}
        catch(error){
            setError(error => error)
        }
    }

    return(
        <div id="container">
            <div id="sidebar">
                <p>{loading ? "Loading..." : ""}</p>
                <form onSubmit={handleAdd}>
                    <h2>Ajouter un auteur</h2>
                    <label>
                        Firstname : <input name="firstname"/>
                    </label>
                    <p></p>
                    <label>
                        Lastname : <input name="lastname"/>
                    </label>
                    <button type="submit">Sauvegarder</button>
                </form>
                <div>
                    <h2>Rechercher un auteur</h2>
                    <form onSubmit={handleFilter}>
                        <label>
                            Recherche : <input name="search" />
                        </label>
                        <button type="submit">Rechercher</button>
                    </form>
                    <Pagination
                        page={currentPage}
                        pageSize={pagesize}
                        total={totalElements}
                        onPageChange={onPageChange}
                    />
                    <ul>
                        {authors.map((author) => (
                            <li key={author.id}>
                                <NavLink to={`/authors/${author.id}`}>
                                    #{author.id} - {author.firstname} {author.lastname}
                                </NavLink>
                                <button className='small danger' onClick={() => handleDelete(author.id)}>
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