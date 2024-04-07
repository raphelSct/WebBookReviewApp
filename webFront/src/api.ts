import { AuthorCreationData, GetAuthorParams, Author, BookCreationData, GetBooksParams, AuthorUpdateData, BookUpdateData, Book, CommentsCreationData } from "./types";
import { toast } from "sonner"
const apiBasename="http://localhost:3000"

export async function get_authors(gap: GetAuthorParams) {
    let list = ((gap.page??0)-1)*(gap.pageSize??0);
    
    const res = await fetch(`${apiBasename}/authors?skip=${list}&take=${gap.pageSize}`+ (gap.lastname ? `&lastname=${gap.lastname}` : ''));
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg);
    }
    const authors = await res.json();
    const totalAuthors = res.headers.get('X-Total-Count');
    return {authors, totalAuthors};
  }

export async function add_authors(adc: AuthorCreationData){
    try
    {const res = await fetch(`${apiBasename}/authors`,{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(adc)
    });
    const result = await res.json();
    console.log("Success:", result);
    toast("Author added !")
  }
    catch(error){
      console.error("Error:", error);
    }
}

export async function delete_author(id: number){
  try
    {const res = await fetch(`${apiBasename}/authors/${id}`,{
      method:"DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    console.log("Success:", result);
    toast("Author deleted")
  }
    catch(error){
      console.error("Error:", error);
    }
}

export async function get_one(id: number){
  try{
    const res = await fetch(`${apiBasename}/authors/${id}`);
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg);
    }
    const author = await res.json();
    return author;
  }
  catch(error){
    console.error("Error: ", error);
  }
}
  
export async function get_books_of_author(author: Author){
    const res = await fetch(`${apiBasename}/authors`+ (author ? `/${author.id}` : '') + "/books");
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg);
    }
    const books = await res.json();
    return books;
}

export async function add_book(bcd: BookCreationData, authorId: number){
  try
  {const res = await fetch(`${apiBasename}/authors/${authorId}/books`,{
    method:"POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bcd)
  });
  const result = await res.json();
  console.log("Success:", result);
  toast("Book added !")
}
  catch(error){
    console.error("Error:", error);
  }
}

export async function delete_book(id: number){
  try
    {const res = await fetch(`${apiBasename}/books/${id}`,{
      method:"DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    console.log("Success:", result);
    toast("Book deleted")
  }
    catch(error){
      console.error("Error:", error);
    }
}

export async function get_books(gbp: GetBooksParams){
  try{
    let list = ((gbp.page??0)-1)*(gbp.pageSize??0);

    const res = await fetch(`${apiBasename}/books?skip=${list}&take=${gbp.pageSize}`+ (gbp.title ? `&lastname=${gbp.title}` : ''));
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg);
    }
    const books_ = await res.json();
    const totalBooks = res.headers.get('X-Total-Count');
    return {books_, totalBooks};
  }
  catch(error){
    console.error("Error: ", error);
  }
}

export async function get_one_book(id: number){
  try{
    const res = await fetch(`${apiBasename}/books/${id}`);
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg);
    }
    const book = await res.json();
    return book;
  }
  catch(error){
    console.error("Error: ", error);
  }
}

export async function get_tags(){
  try{
    const res = await fetch(`${apiBasename}/tags`);
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg);
    }
    const tags = await res.json();
    return tags;
  }
  catch(error){
    console.error("Error: ", error);
  }
}

export async function add_tag(book_id: number, tag_id: number){
  try
  {
    const res = await fetch(`${apiBasename}/books/${book_id}/tags/${tag_id}`,{
    method:"POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({})
  });
  const result = await res.json();
  console.log("Success:", result);
}
  catch(error){
    console.error("Error:", error);
  }
}

export async function get_tags_of_book(book_id: number){
  try{
    const res = await fetch(`${apiBasename}/books/${book_id}/tags`);
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg);
    }
    const tags = await res.json();
    return tags;
  }
  catch(error){
    console.error("Error: ", error);
  }
}

export async function update_author(aud: AuthorUpdateData, id: number){
  try
  {const res = await fetch(`${apiBasename}/authors/${id}`,{
    method:"PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(aud)
  });
  const result = await res.json();
  console.log("Success:", result);
  toast("Author updated !")
}
  catch(error){
    console.error("Error:", error);
  }
}

export async function update_book(bud: BookUpdateData, id: number){
  try
  {
    console.log(bud)
    const res = await fetch(`${apiBasename}/books/${id}`,{
    method:"PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bud)
  });
  const result = await res.json();
  console.log("Success:", result);
  toast("Book updated !")
}
  catch(error){
    console.error("Error:", error);
  }
}

export async function add_comment_to_book(ccd: CommentsCreationData, book_id: number){
  try{
    console.log(ccd)
    const res = await fetch(`${apiBasename}/books/${book_id}/comments`,{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ccd)
    });
    const result = await res.json();
    console.log("Success:", result);
    toast("Succesfully added comment !")
  }
  catch(error){
    console.error("Error:", error);
  }
}

export async function get_comments_from_book(book_id: number){
  try{
    const res = await fetch(`${apiBasename}/books/${book_id}/comments`);
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg);
    }
    const comments = await res.json();
    return comments;
  }
  catch(error){
    console.error("Error: ", error);
  }
}