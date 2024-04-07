import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { get_one_book, get_one, update_book, add_comment_to_book} from "../api";
import { Author, Book, BookUpdateData, CommentsCreationData } from "../types";
import { BookTags } from "./booktags";
import { EditableText } from "../utils/editableText";
import { CommentForm } from "../utils/addcomment";
import { Comments } from "./comments";


export function BookDetails(){
    const [loading, setLoading] = useState<boolean>(false);
    const [book, setBook] = useState<Book>();
    const [author, setAuthor] = useState<Author>();
    let { book_id } = useParams<{ book_id : string }>();

    async function loadOne() {
        try {
            setLoading(true);
            const temp = await get_one_book(Number(book_id));
            const author = await get_one(temp.authorId);
            setBook(temp);

            setAuthor(author);
            setLoading(false);
        } catch (error) {
            console.error("Error loading book:", error);
        }
    }

    useEffect(() => {
        loadOne();
    }, [book_id, book?.title, book?.publication_year]);

    function updateTitle(newTitle: string) {
        setBook((prevBook) => {
            if (prevBook !== undefined) {
                return {...prevBook, title: newTitle};
            }
            return prevBook;
        });
        const updateData:BookUpdateData = {title: newTitle};
        if (book){
            update_book(updateData, book.id);
        }
    }

    function updatePublicationYear(newPublicationYear: string) {
        setBook((prevBook) => {
            if (prevBook !== undefined) {
                return {...prevBook, publication_year: +newPublicationYear};
            }
            return prevBook;
        });
        const updateData:BookUpdateData = {publication_year: +newPublicationYear};
        if (book){
            update_book(updateData, book.id);
        }
    }

    function addComment(ccd: CommentsCreationData) {
        if (book) {
            add_comment_to_book(ccd, book.id);

        }
    }

    return (
    <>
        
        {book && author ? (
            <div>
            <p>{loading ? "Loading..." : ""}</p>
        <EditableText value={book && book.title || ""} onUpdated={updateTitle} />
        Publication year :  <EditableText value={book && book.publication_year.toString() || ""} onUpdated={updatePublicationYear}/>
        <p>Author:{" "}
            <NavLink to={`/authors/${author && author.id}`}>
                {author && `${author.firstname} ${author.lastname}`}
                        </NavLink>
                    </p>
                    {book && (<BookTags {...book}/>)}
                    <h3>Comments</h3>
                    <Comments bookId={book_id ? Number(book_id) : 0} />
                    <CommentForm addComment={addComment} bookId={book ? book.id : 0} />
                </div>
            ) : ( <h2>Book not found</h2>)}
        </>
    );
}