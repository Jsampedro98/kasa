import { MetadataRoute } from 'next';
import { getProperties } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    // Static routes
    const routes = [
        '',
        '/about',
        '/favorites',
        '/login',
        '/register',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic routes for properties
    const properties = await getProperties();
    const propertyRoutes = properties.map((property) => ({
        url: `${baseUrl}/property/${property.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    return [...routes, ...propertyRoutes];
}
