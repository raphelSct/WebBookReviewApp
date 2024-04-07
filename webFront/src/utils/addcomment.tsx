import { useEffect, useState } from "react"
import { MessageSquareMore } from "lucide-react"
import { CommentFormProps, CommentsCreationData } from "../types"

export function CommentForm({addComment, bookId}: CommentFormProps){
    const [writing, setWriting ] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");
    const [username, setUsername] = useState<string>(""); // Utilisez la valeur de l'état pour le textarea
    const [id, setId] = useState<number>(bookId);

    useEffect(() => {
        setWriting(false);
    }
    ,[bookId]);

    function onSubmitComment(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        addComment({content: inputValue, username: username});
        setInputValue("");
        setWriting(false);
    }

    return(
        <div>
            {writing ? (
                <div>
                <form onSubmit={onSubmitComment}>
                <input type="text" name="username" placeholder="Username" onChange={(e)=>setUsername(e.target.value)}/>
                <br/>
                <textarea                        
                        name="textValue" 
                        value={inputValue} // Utilisez la valeur de l'état pour le textarea
                        onChange={(e) => setInputValue(e.target.value)} // Met à jour la valeur du textarea à chaque changement
                        rows={8}
                        cols={45}
                    />
                    <br/>
                    <button type='submit'>Save</button>
                    <button onClick={() => setWriting(false)}>Cancel</button>
                </form>
                
                </div>
            ) : (
                <div id="edit-value">
                    <p>Ajouter un commentaire pour ce livre</p>
                    <MessageSquareMore size={20} onClick={() => setWriting(true)}/>
                </div>
            )}
        </div>
    )
}