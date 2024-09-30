import axios from 'axios';
import { api } from '@/boot/axios';
import { Discover } from '@/types';
import { defineStore } from 'pinia';

// type MovieListType = 'now_playing' | 'popular' | 'top_rated' | 'upcoming'

interface State {
    nowPlaying: Discover[]
    popular: Discover[]
    topRated: Discover[]
    upcoming: Discover[]
    movie_info: Discover
}

export const useMovieListStore = defineStore('movie-lists', {
    state: (): State => ({
        nowPlaying: [],
        popular: [],
        topRated: [],
        upcoming: [],
        movie_info: {
            id: 0,
            adult: false,
            backdrop_path: '',
            genre_ids: [],
            original_language: '',
            original_title: '',
            overview: '',
            popularity: 0,
            poster_path: '',
            release_date: '',
            title: '',
            video: false,
            vote_average: 0,
            vote_count: 0
        },
    }),
    actions: {
        // async getMovieLists(type: MovieListType) {
        //     const { data } = await api.get(`/movie/${type}`)
        //     if (type === 'now_playing') {
        //         this.nowPlaying = data.results.splice(0, 10)
        //     } else if (type === 'popular') {
        //         this.popular = data.results.splice(0, 10)
        //     } else if (type === 'top_rated') {
        //         this.topRated = data.results.splice(0, 10)
        //     } else if (type === 'upcoming') {
        //         this.upcoming = data.results.splice(0, 10)
        //     }
        // },

        async getMovieLists() {
            try {
                const [nowPlayingResponse, popularResponse, topRatedResponse, upcomingResponse] = await axios.all([
                    api.get('/movie/now_playing'),
                    api.get('/movie/popular'),
                    api.get('/movie/top_rated'),
                    api.get('/movie/upcoming'),
                ]);

                this.nowPlaying = nowPlayingResponse.data.results.splice(0, 10);
                this.popular = popularResponse.data.results.splice(0, 10);
                this.topRated = topRatedResponse.data.results.splice(0, 10);
                this.upcoming = upcomingResponse.data.results.splice(0, 10);
            } catch (error) {
                console.error('Error fetching Movie data:', error);
            }
        },

        async fetchMovie(movie_id: string) {
            try {
                const tmdb = await api.get(`/movie/${movie_id}?append_to_response=videos,images,credits,reviews,similar,recommendations,keywords,external_ids`);
                const imdb = await axios.get(`${import.meta.env.VITE_APP_OMBD_BASE_URL}/?i=${tmdb.data.imdb_id}&apikey=${import.meta.env.VITE_APP_OMBD_API_KEY}`)

                const { Metascore, imdbVotes, imdbRating, Rated, Ratings } = await imdb.data;

                tmdb.data.meta_score = Metascore;
                tmdb.data.imdb_rating = imdbRating;
                tmdb.data.imdb_votes = imdbVotes;
                tmdb.data.rated = Rated;
                tmdb.data.other_rate = Ratings;

                this.movie_info = tmdb.data
                console.log('adasd', await tmdb.data)
            } catch (error) {
                console.error(error)
            }
        }
    },
});