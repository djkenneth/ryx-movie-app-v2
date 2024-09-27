import { api } from '@/boot/axios';
import { Discover } from '@/types';
import { defineStore } from 'pinia';

type MovieListType = 'now_playing' | 'popular' | 'top_rated' | 'upcoming'

interface State {
    nowPlaying: Discover[]
    popular: Discover[]
    topRated: Discover[]
    upcoming: Discover[]
}

export const useMovieListStore = defineStore('movie-lists', {
    state: (): State => ({
        nowPlaying: [],
        popular: [],
        topRated: [],
        upcoming: [],
    }),
    actions: {
        async getMovieLists(type: MovieListType) {
            const { data } = await api.get(`/movie/${type}`)
            if (type === 'now_playing') {
                this.nowPlaying = data.results.splice(0, 10)
            } else if (type === 'popular') {
                this.popular = data.results.splice(0, 10)
            } else if (type === 'top_rated') {
                this.topRated = data.results.splice(0, 10)
            } else if (type === 'upcoming') {
                this.upcoming = data.results.splice(0, 10)
            }
        },
    },
});