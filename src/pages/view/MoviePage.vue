<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { useMovieListStore } from '@/stores/useMovieList'
import imagePath from '@/utils/imagePath';

defineOptions({
  name: 'MoviePage'
});
const storeMovie = useMovieListStore();
const route = useRoute()

onMounted( async () => {
    await storeMovie.fetchMovie(route.params.id as string)
})


</script>

<template>
    <q-page :class="{
        'absolute-full': $q.screen.gt.sm
    }">
        <q-img :src="imagePath(storeMovie.movie_info.backdrop_path, 'original')" height="95dvh">
            <!-- <div class="absolute-bottom text-subtitle1 text-center">
                Caption
            </div> -->
        </q-img>
    </q-page>
</template>