import React, { useEffect } from 'react';
import { useState } from 'react';
import { Comment } from '../types';
import {get_comments_from_book} from "../api";

export function Comments({bookId}: {bookId: number}){
    const [comments, setComments] = useState<Comment[]>([]);
    

    useEffect(() => {
        loadComments()
    }
    ,[bookId, comments]);

    async function loadComments(){
        const response = await get_comments_from_book(bookId);
        setComments(response);
    }

    return (
        <div>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id}>{comment.content}</li>
                ))}
            </ul>
        </div>
    )
}