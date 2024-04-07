import { useParams } from "react-router-dom"
import { get_one, get_books_of_author, add_book, delete_book, update_author } from "../api"
import { useEffect } from "react";
import { useState } from "react";
import { Author, Book, BookCreationData, AuthorUpdateData } from "../types";
import { AuthorBooks } from "./authorbooks";
import { EditableText } from "../utils/editableText";


export function AuthorDetails() {
    const [loading, setLoading] = useState<boolean>(false);
    const [author, setAuthor] = useState<Author>();
    let { author_id } = useParams<{ author_id: string }>();

    async function loadOne() {
        try {
            setLoading(true);
            const temp = await get_one(Number(author_id));
            setAuthor(temp);
            setLoading(false);
        } catch (error) {
            console.error("Error loading author:", error);
        }
    }

    function updateFirstname(newFirstname: string) {
        setAuthor((prevAuthor) => {
            if (prevAuthor !== undefined) {
                return {...prevAuthor, firstname: newFirstname};
            }
            return prevAuthor;
        });
        const updateData: AuthorUpdateData = { firstname: newFirstname, lastname: author?.lastname || '' };
        if (author) {
            update_author(updateData, author.id);
        }
    }
    
    function updateLastname(newLastname: string) {
        setAuthor((prevAuthor) => {
            if (prevAuthor !== undefined) {
                return {...prevAuthor, lastname: newLastname};
            }
            return prevAuthor;
        });
        const updateData: AuthorUpdateData = { firstname: author?.firstname || '', lastname: newLastname };
        if (author) {
            update_author(updateData, author.id);
        }
    }

    useEffect(() => {
        loadOne();
    }, [author_id]);

    return (
    <div>
        <p>{loading ? "Loading..." : ""}</p>
        <div id="edit-value">
            <EditableText value={author && author.firstname || "" } onUpdated={updateFirstname}/> <EditableText value={author && author.lastname || "" } onUpdated={updateLastname}/>
        </div>
        {author && (
            <AuthorBooks id={author.id} firstname={author.firstname} lastname={author.lastname} />
        )}
    </div>
);
}
