import { useEffect, useState } from "react"
import { MessageSquareMore, Star } from "lucide-react"
import { CommentFormProps, CommentsCreationData, GradeCreationData, GradeProps } from "../types"
import { Slider } from "@radix-ui/react-slider";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

export function StarsForm({addGrade, bookId}: GradeProps){
    const [grading, setGrading ] = useState<boolean>(false);
    const [grade, setGrade] = useState(1);
    const [username, setUsername] = useState<string>(""); // Utilisez la valeur de l'état pour le textarea
    const [id, setId] = useState<number>(bookId);

    useEffect(() => {
        setGrading(false);
    }
    ,[bookId]);

    function onSubmitGrade(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        const nameToSubmit = username.trim() === "" ? "Anonymous" : username;
        addGrade({pseudo: nameToSubmit, value: grade});
        setGrade(1);
        setGrading(false);
    }

    return(
        <div>
        {grading ? (
                
                <div>
                <form onSubmit={onSubmitGrade}>
                <input type="text" name="username" placeholder="Username" onChange={(e)=>setUsername(e.target.value)}/>
                <br/>
                {[...Array(5)].map((star,i) => {
                    const currentRate=i+1;
                    return(
                        <>
                            <label key={i}>
                                <input id="radio" type="radio" name="grade" value={grade} onClick={() => setGrade(currentRate + 1)}/>
                                <Star color={i < grade-1 ? "gold" : "black"}/>
                            </label>
                        </>
                    )
                })}
                <button type="submit">Envoyer</button>
                </form>
                
                </div>
            ) : (
                <div id="edit-value">
                    <p>Ajouter une note pour ce livre</p>
                    <Star size={20} onClick={() => setGrading(true)}/>
                </div>
            )}
        </div>
    )
}