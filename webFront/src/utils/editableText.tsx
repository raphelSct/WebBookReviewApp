import React, {useEffect, useState} from 'react';
import { Pen } from 'lucide-react';

export function EditableText({value, onUpdated}: {
    value: string,
    onUpdated: (newValue: string) => void
}){
    const [editing, setEditing] = useState(false);
    const [inputValue, setInputValue] = useState(value); // Utilisez un état pour stocker la valeur de l'input
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        setEditing(false);
    }
    ,[value]);

    async function onUpdate(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault(); // Empêche la soumission du formulaire par défaut

        setUpdating(true); // Active l'état de mise à jour

        try {
            await onUpdated(event.currentTarget.textValue.value); // Appelle la fonction de mise à jour avec la nouvelle valeur
            setEditing(false); // Désactive l'édition après la mise à jour réussie
        } catch (error) {
            setError(error=>error); // Gère les erreurs de mise à jour
        } finally {
            setUpdating(false); // Désactive l'état de mise à jour, que la mise à jour ait réussi ou échoué
        }
    }

    return(
        <div>
            {editing ? (
                <form onSubmit={onUpdate}>
                <input 
                    name="textValue" 
                    type="text" 
                    value={inputValue} // Utilisez la valeur de l'état pour l'input
                    onChange={(e) => setInputValue(e.target.value)} // Met à jour la valeur de l'input à chaque changement
                />
                    <button type='submit'>Save</button>
                </form>
            ) : (
                <div id="edit-value">
                    <h2>{value}</h2>
                    <Pen size={16} onClick={() => setEditing(true)}/>
                </div>
            )}
        </div>
    )
}