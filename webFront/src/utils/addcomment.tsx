import { useEffect, useState } from "react"
import { MessageSquareMore } from "lucide-react"
import { CommentFormProps } from "../types"

export function CommentForm({addComment, bookId}: CommentFormProps){
    const [writing, setWriting ] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");
    const [id, setId] = useState<number>(bookId);

    useEffect(() => {
        setWriting(false);
    }
    ,[bookId]);

    function onSubmitComment(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        addComment(inputValue);
        setInputValue("");
        setWriting(false);
    }

    return(
        <div>
            {writing ? (
                <div>
                <form onSubmit={onSubmitComment}>
                <textarea                        
                        name="textValue" 
                        value={inputValue} // Utilisez la valeur de l'état pour le textarea
                        onChange={(e) => setInputValue(e.target.value)} // Met à jour la valeur du textarea à chaque changement
                        rows={8}
                        cols={45}
                    />
                    <button type='submit'>Save</button>
                </form>
                <button onClick={() => setWriting(false)}>Cancel</button>
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