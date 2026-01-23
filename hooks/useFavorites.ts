"use client";

import { useState, useEffect } from "react";

export default function useFavorites() {
    const [favorites, setFavorites] = useState<string[]>([]);


    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);


    const toggleFavorite = (id: string) => {
        let newFavorites;
        if (favorites.includes(id)) {
            newFavorites = favorites.filter((fav) => fav !== id);
        } else {
            newFavorites = [...favorites, id];
        }
        setFavorites(newFavorites);
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
    };


    const isFavorite = (id: string) => favorites.includes(id);

    return { favorites, toggleFavorite, isFavorite };
}
