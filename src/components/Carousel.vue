<script setup lang="ts">
import axios from 'axios';
import { useQuasar } from 'quasar';
import { ref, onBeforeMount, computed } from 'vue';
import imagePath from '../utils/imagePath';
import { Discover } from 'src/types';
import Container from '@/components/ContainerLayout.vue'

defineOptions({
  name: 'CarouselComponent'
});

const $q = useQuasar()

const slide = ref(1)
const autoplay = ref(20000)
const movies = ref<Discover[]>([])

const discoverMovie = async () => {
    try {
        const type = 'movie';
        const sortBy = 'popularity.desc';
        const page = 1;
        const year = 2024;
        // const genre = 'Action';
        const res = await axios.get(`https://api.themoviedb.org/3/discover/${type}?api_key=${import.meta.env.VITE_APP_TMDB_API_KEY}&sort_by=${sortBy}&page=${page}&${type === 'movie' ? 'year=' : 'primary_release_year='}${year}`)
        // console.log(res.data.results)
        movies.value = res.data.results.splice(0, 7)
    } catch (err) {
        console.log(err)
    }
}

const buttonSize = computed(() => {
    return $q.screen.gt.sm ? 'md' : 'sm'
})

const carouselHeight = computed(() => {
    return $q.screen.gt.md ? '600px' : '400px'
})

onBeforeMount(() => {
    discoverMovie()
})
</script>

<template>
    <q-carousel animated v-model="slide" navigation infinite arrows :autoplay="autoplay" transition-prev="slide-right"
        transition-next="slide-left" :height="carouselHeight">
        <q-carousel-slide v-for="item in movies" :key="item.id" :name="item.id"
            :img-src="imagePath(item.backdrop_path, 'original')" class="flex bg-gradient">
            <Container>
                <div class="carousel-content" :class="{
                    'carousel-content-sm': $q.screen.lt.md
                }">
                    <h2 class="text-white text-h2 text-weight-bold q-my-none" :class="{
                        'text-h4': $q.screen.lt.md
                    }">{{ item.title }}</h2>

                    <h2 class="primary-color text-h2 text-weight-bold q-my-none flex items-start" :class="{
                        'text-h4': $q.screen.lt.md
                    }">{{ item.vote_average.toFixed(1) }} <span class="text-white text-subtitle1">/10</span></h2>

                    <p class="text-white text-subtitle1" :class="{
                        'carousel-overview': $q.screen.lt.md
                    }">{{ item.overview }}</p>

                    <div class="flex carousel-buttons">
                        <q-btn class="primary-button" :size="buttonSize" rounded label="View more" />
                        <q-btn outline round color="primary" :size="buttonSize" icon="favorite" />
                    </div>
                </div>
            </Container>
        </q-carousel-slide>
    </q-carousel>
</template>

<style lang="scss" scoped>
.bg-gradient {
    position: relative;

    .carousel-content {
        position: relative;
        z-index: 10;
        width: 60%;
        display: flex;
        flex-direction: column;
        gap: 20px;

        .carousel-overview {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            line-clamp: 4;
            -webkit-line-clamp: 4;
            /* number of lines to show */
            -webkit-box-orient: vertical;
        }
    }

    .carousel-content-sm {
        width: 90%;
        gap: 10px;
    }

    .carousel-buttons {
        gap: 10px;
    }
}

.bg-gradient::after {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgb(0, 0, 0);
    opacity: 0.5;
}
</style>