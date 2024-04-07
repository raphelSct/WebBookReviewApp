export interface Author {
    id: number;
    firstname: string;
    lastname: string;
    books?: Book[];
}

export interface AuthorCreationData{
    firstname: string;
    lastname: string;
    books?: Book[];
}

export interface AuthorUpdateData{
    firstname?: string;
    lastname?: string;
}

export interface GetAuthorParams{
    page?: number;
    pageSize?: number;
    lastname?: string;
}

export interface GetBooksParams{
    page?: number;
    pageSize?: number;
    title?: string;
}

export interface Book{
    id: number;
    title: string;
    publication_year: number;
    author: Author;
    authorId: number;
    tags?: Tag[];
}

export interface BookCreationData{
    title: string;
    publication_year: number;
    tags?: Tag[];
}

export interface BookUpdateData{
    title?: string;
    publication_year?: number;
}

export interface Tag{
    id: number;
    name: string;
    books?: Book[];
}

export interface PaginationProps {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (index: number) => void;
}

export interface Comment {
    id: number;
    content: string;
    bookId: number;
    authorId: number;
    username: string;
}

export interface CommentsCreationData{
    username?: string;
    content: String;
}

export interface CommentFormProps {
    addComment: (content: CommentsCreationData) => void;
    bookId: number;
}