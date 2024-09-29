import axios from 'axios';
import { api } from '@/boot/axios';
import { Discover } from '@/types';
import { defineStore } from 'pinia';

// type TvShowListType = 'airing_today' | 'on_the_air' | 'popular' | 'top_rated'

interface State {
    airingToday: Discover[]
    onTheAir: Discover[]
    popular: Discover[]
    topRated: Discover[]
}

export const useTvShowListStore = defineStore('tv-show-lists', {
    state: (): State => ({
        airingToday: [],
        onTheAir: [],
        popular: [],
        topRated: [],
    }),
    actions: {
        // async getTvShowLists(type: TvShowListType) {
        //     const { data } = await api.get(`/tv/${type}`);
        //     if (type === 'airing_today') {
        //         console.log('data', data.results)
        //         this.airingToday = await data.results.splice(0, 10)
        //     } else if (type === 'on_the_air') {
        //         this.onTheAir = await data.results.splice(0, 10)
        //     } else if (type === 'popular') {
        //         this.popular = await data.results.splice(0, 10)
        //     } else if (type === 'top_rated') {
        //         this.topRated = await data.results.splice(0, 10)
        //     }
        // },

        async getTvShowLists() {
            try {
                const [airingTodayResponse, onTheAirResponse, popularResponse, topRatedResponse] = await axios.all([
                    api.get('/tv/airing_today'),
                    api.get('/tv/on_the_air'),
                    api.get('/tv/popular'),
                    api.get('/tv/top_rated')
                ]);

                // Extract data and store in state

                this.airingToday = airingTodayResponse.data.results.slice(0, 10);
                this.onTheAir = onTheAirResponse.data.results.slice(0, 10);
                this.popular = popularResponse.data.results.slice(0, 10);
                this.topRated = topRatedResponse.data.results.slice(0, 10);

            } catch (error) {
                console.error('Error fetching TV show data:', error);
                // Handle the error as needed (e.g., show error message)
            }
        }

    },
});