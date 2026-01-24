import { Property } from '@/types';

const API_URL = 'http://127.0.0.1:4000/api';

/**
 * Fetches all properties from the API.
 * @returns {Promise<Property[]>} A list of all properties.
 */
export async function getProperties(): Promise<Property[]> {
    try {
        const response = await fetch(`${API_URL}/properties`);
        if (!response.ok) {
            throw new Error('Failed to fetch properties');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching properties:', error);
        return [];
    }
}

/**
 * Fetches a single property by its ID.
 * @param {string} id - The unique identifier of the property.
 * @returns {Promise<Property | null>} The property object or null if not found.
 */
export async function getProperty(id: string): Promise<Property | null> {
    try {
        const response = await fetch(`${API_URL}/properties/${id}`);
        if (!response.ok) {
            if (response.status === 404) return null;
            throw new Error('Failed to fetch property');
        }
        return response.json();
    } catch (error) {
        console.error(`Error fetching property ${id}:`, error);
        return null;
    }
}
