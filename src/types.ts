
export type Genres = {
    id: number;
    name: string;
}

export type Cast = {
    cast_id: number;
    profile_path: string;
    original_name: string;
    known_for_department: string;
    adult: boolean
    character: string
    credit_id: string
    gender: number
    id: number
    name: string
    order: number
    popularity: number
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
    credits?: {
        cast: Cast[]
    }
}