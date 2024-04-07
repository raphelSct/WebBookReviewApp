import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get_ratings } from "../api";
import { Rating, GradeCreationData } from "../types";
import {Star } from "lucide-react"

export function Ratings({bookId}: {bookId: number}){
    const [loading, setLoading] = useState<boolean>(false);
    const [ratings, setRatings] = useState<Rating[]>();

    async function loadRatings() {
        try {
            setLoading(true);
            const temp = await get_ratings(Number(bookId));
            setRatings(temp);
            setLoading(false);
            console.log("Ratings loaded:", temp)
        } catch (error) {
            console.error("Error loading ratings:", error);
        }
    }

    useEffect(() => {
        loadRatings();
    }, [bookId]);


    return (
        <div>
            <h3>Ratings</h3>
            <ul>
                {ratings?.map((rating, i) => (
                    <li key={i} id="rates">
                        {rating.pseudo} : 
                        {[...Array(5)].map((star, j) => (
                            <Star key={j} color={j < rating.value-1 ? "gold" : "black"}/>
                        ))}
                    </li>
                ))}
            </ul>
        </div>
    );
}