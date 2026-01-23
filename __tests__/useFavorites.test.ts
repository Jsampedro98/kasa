import { renderHook, act } from '@testing-library/react';
import useFavorites from '@/hooks/useFavorites';

describe('useFavorites hook', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('should initialize with empty favorites', () => {
        const { result } = renderHook(() => useFavorites());
        expect(result.current.favorites).toEqual([]);
    });

    it('should toggle favorite status', () => {
        const { result } = renderHook(() => useFavorites());

        // Add
        act(() => {
            result.current.toggleFavorite('123');
        });
        expect(result.current.favorites).toContain('123');
        expect(result.current.isFavorite('123')).toBe(true);

        // Remove
        act(() => {
            result.current.toggleFavorite('123');
        });
        expect(result.current.favorites).not.toContain('123');
        expect(result.current.isFavorite('123')).toBe(false);
    });

    it('should persist to localStorage', () => {
        const { result } = renderHook(() => useFavorites());

        act(() => {
            result.current.toggleFavorite('456');
        });

        const stored = JSON.parse(localStorage.getItem('favorites') || '[]');
        expect(stored).toContain('456');
    });

    it('should load directly from localStorage on mount', () => {
        localStorage.setItem('favorites', JSON.stringify(['789']));

        const { result } = renderHook(() => useFavorites());

        expect(result.current.favorites).toContain('789');
    });
});
