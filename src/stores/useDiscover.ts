import { api } from '@/boot/axios';
import { Discover } from '@/types';
import { defineStore } from 'pinia';

type DiscoverType = 'movie' | 'tv'

interface State {
    movies: Discover[]
    tv: Discover[]
}

export const useDiscoverStore = defineStore('discover', {
    state: (): State => ({
        movies: [],
        tv: []
    }),
    // getters: {
    //     doubleCount: (state) => state.counter * 2,
    // },
    actions: {
        async getDiscovers(type: DiscoverType, year: string) {
            const { data } = await api.get(`/discover/${type}?year=${year}`)
            // console.log('data', data.results)
            if (type === 'movie') {
                this.movies = data.results.splice(0, 7)
            } else if (type === 'tv') {
                this.tv = data.results.splice(0, 7)
            }
        },
    },
});