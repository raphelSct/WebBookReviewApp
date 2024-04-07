import React, { useEffect, useState } from 'react';
import { Tag, Book } from '../types';
import { get_tags, add_tag, get_tags_of_book } from '../api';
import { ComboboxDemo } from '../utils/combobox';


export function BookTags(book : Book){
    const [error, setError] = useState<string>("");
    const [tags, setTags] = useState<Tag[]>([]);
    const [bookTags, setBookTags] = useState<Tag[]>([]);
    const [selectedTag, setSelectedTag] = useState<number>(0);


    useEffect(() => {
        loadTags();
    }
    ,[]);

    useEffect(() => {
        loadBookTags();
    }
    ,[book.id]);

    async function loadBookTags() {
        const temp = await get_tags_of_book(book.id);
        setBookTags(temp);
    }

    async function loadTags() {
        const temp = await get_tags();
        setTags(temp);
    }

    async function handleAdd() {
        try{
            console.log(book.id, selectedTag);
            await add_tag(book.id, selectedTag);
            loadBookTags();
        }
        catch(error){
            setError(error=>error)
        }
    }

    function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedTag(Number(event.target.value));
    }


    return (
    <div>
            Book tags :
            {bookTags.map((tag) => (
                <span key={tag.id} className="badge">
                {tag.name}
                <button>x</button>
              </span>
            ))}
        <form>
            <br></br>
            <select value={selectedTag} onChange={handleSelectChange}>
                <option value="">- Select a tag -</option>
                {tags.map((tag) => (
                    <option key={tag.id} value={tag.id}>{tag.name}</option>
                ))}
            </select>
            <button type="button" onClick={handleAdd}>Add tag</button>
        </form>
    </div>
);
}