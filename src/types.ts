
export type Genres = {
    id: number;
    name: string;
}

export interface Discover {
    id: number;
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    first_air_date?: string;
    name?: string;
    origin_country?: string[];
    original_name?: string;
    genres?: Genres[]
}