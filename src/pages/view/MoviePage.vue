<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useQuasar } from 'quasar';
import { useRoute } from 'vue-router'
import Container from '@/components/ContainerLayout.vue'
import { useMovieListStore } from '@/stores/useMovieList'
import imagePath from '@/utils/imagePath';

defineOptions({
    name: 'MoviePage'
});

const $q = useQuasar();

// const isLike = ref(false)

const storeMovie = useMovieListStore();
const route = useRoute()

onMounted(async () => {
    await storeMovie.fetchMovie(route.params.id as string)
    console.log($q.screen)
})

const buttonSize = computed(() => {
    return $q.screen.gt.sm ? 'md' : 'sm'
})

</script>

<template>
    <q-page :class="{
        'absolute-full': $q.screen.gt.sm
    }">
        <q-img :src="imagePath(storeMovie.movie_info.backdrop_path, 'original')" class="text-white relative-position" height="95dvh">
            <Container class="flex full-width full-height absolute">
                <div class="flex items-center gap-50">
                    <div>
                        <q-card class="rounded">
                            <q-img :src="imagePath(storeMovie.movie_info.poster_path, 'w200')" class="card-shadow"
                                fit="cover" :width="$q.screen.gt.md ? '275px' : '250px'" :height="$q.screen.gt.md ? '420px' : '400px'">
                                <div class="absolute-bottom">
                                    <!-- <div class="flex column">
                                    <span class="text-h6">{{ item.title || item.name }}</span>
                                    </div> -->
                                </div>
                            </q-img>
                        </q-card>
                    </div>
                    <div class="column gap-15">
                        <h1 class="text-weight-bold q-my-md" :class="$q.screen.gt.md ? 'text-h2' : 'text-h4'">
                            {{ storeMovie.movie_info.title }}
                        </h1>
                        <div class="flex">
                            <p class="view-genre" :class="[$q.screen.gt.md ? 'q-py-sm q-px-md' : 'q-py-xs q-px-sm']" v-for="(genre, i) in storeMovie.movie_info.genres"
                                :key="i">
                                {{ genre.name }}
                            </p>
                        </div>
                        <div class="flex items-end" :class="[$q.screen.lt.sm ? 'gap-20' : 'gap-30']">
                            <h2 class="primary-color text-h2 text-weight-bold q-my-none flex items-start" :class="{
                                'text-h4': $q.screen.lt.md
                            }">{{ storeMovie.movie_info.vote_average.toFixed(1) }} <span
                                    class="text-white text-subtitle1">/10</span></h2>
                            <div>
                                <q-icon name="favorite" size="2rem" color="red" />
                                <span>{{ storeMovie.movie_info.vote_count }}</span>
                            </div>
                        </div>
                        <div class="flex gap-10">
                            <q-btn class="primary-button" :size="buttonSize" rounded label="View more" style="width: 10rem;" />
                            <q-btn outline round color="primary" :size="buttonSize" icon="favorite" />
                        </div>
                    </div>
                </div>
            </Container>
        </q-img>
    </q-page>
</template>

<style lang="scss" scoped>
.card-shadow {
    box-shadow: 1px 1px 30px 1px #18ffff !important;
}

.view-genre {
    color: #18ffff;
    border: 2px solid #18ffff;
    // padding: 4px 12px;
    font-family: "Open Sans", sans-serif;
    font-size: 17px;
    font-weight: bold;
    border-radius: 5px;
    margin-right: 10px;
}
</style>