import { Property } from '@/types';

const API_URL = 'http://127.0.0.1:4000/api';

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
