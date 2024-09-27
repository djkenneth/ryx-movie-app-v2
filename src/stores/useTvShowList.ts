import { api } from '@/boot/axios';
import { Discover } from '@/types';
import { defineStore } from 'pinia';

type TvShowListType = 'airing_today' | 'on_the_air' | 'popular' | 'top_rated'

interface State {
    airingToday: Discover[]
    onTheAir: Discover[]
    popular: Discover[]
    topRated: Discover[]
}

export const useTvShowListStore = defineStore('movie-lists', {
    state: (): State => ({
        airingToday: [],
        onTheAir: [],
        popular: [],
        topRated: [],
    }),
    actions: {
        async getTvShowLists(type: TvShowListType) {
            const { data } = await api.get(`/tv/${type}`)
            if (type === 'airing_today') {
                console.log('data', data.results);

                this.airingToday = data.results.splice(0, 10)
            } else if (type === 'on_the_air') {
                this.onTheAir = data.results.splice(0, 10)
            } else if (type === 'popular') {
                this.popular = data.results.splice(0, 10)
            } else if (type === 'top_rated') {
                this.topRated = data.results.splice(0, 10)
            }
        },
    },
});