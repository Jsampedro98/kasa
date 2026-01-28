"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook for managing user favorites with localStorage persistence
 * 
 * Manages a list of favorite property IDs stored in browser localStorage.
 * Provides methods to toggle favorite status and check if a property is favorited.
 * 
 * @returns {Object} Favorites state and methods
 * @returns {string[]} favorites - Array of favorited property IDs
 * @returns {Function} toggleFavorite - Function to add/remove a property from favorites
 * @returns {Function} isFavorite - Function to check if a property is favorited
 * 
 * @example
 * ```tsx
 * const { favorites, toggleFavorite, isFavorite } = useFavorites();
 * const isLiked = isFavorite('property-123');
 * toggleFavorite('property-123');
 * ```
 */
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
