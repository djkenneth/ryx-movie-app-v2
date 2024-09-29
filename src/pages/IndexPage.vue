<script setup lang="ts">
import { onMounted } from 'vue';
import { useMovieListStore } from '@/stores/useMovieList'
import { useDiscoverStore } from '@/stores/useDiscover'
import Carousel from '@/components/Carousel.vue';
import CategoryGridCards from '@/components/CategoryGridCards.vue'

defineOptions({
  name: 'IndexPage'
});

const storeMovieList = useMovieListStore();
const storeDiscover = useDiscoverStore()

onMounted( async () => {
  await storeMovieList.getMovieLists();
  
  // await storeMovieList.getMovieLists('popular');
  // await storeMovieList.getMovieLists('top_rated');
  // await storeMovieList.getMovieLists('upcoming');
})

</script>

<template>
  <q-page :class="{
    'absolute-full': $q.screen.gt.sm
  }">
    <Carousel :discoverData="storeDiscover.movies" />
    <CategoryGridCards title="Now Playing" type="movie" :movies="storeMovieList.nowPlaying" />
    <CategoryGridCards title="Popular" type="movie" :movies="storeMovieList.popular" />
    <CategoryGridCards title="Top Rated" type="movie" :movies="storeMovieList.topRated" />
    <CategoryGridCards title="Upcoming" type="movie" :movies="storeMovieList.upcoming" />
  

    <!-- <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component> -->
  </q-page>
</template>
