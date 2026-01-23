export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string;
  cover: string;
  pictures: string[];
  host: {
    id: number;
    name: string;
    picture: string;
  };
  rating_avg: number;
  ratings_count: number;
  location: string;
  equipments: string[];
  tags: string[];
  price_per_night: number;
}


export interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
  role: string;
}
