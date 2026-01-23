"use client";

import { useState, useEffect } from "react";

export default function useFavorites() {
    const [favorites, setFavorites] = useState<string[]>([]);

    // Load favorites from localStorage on mount
    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    // Toggle favorite status
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

    // Check if an item is favorite
    const isFavorite = (id: string) => favorites.includes(id);

    return { favorites, toggleFavorite, isFavorite };
}
