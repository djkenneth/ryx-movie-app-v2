<script setup lang="ts">
import { useMovieListStore } from '@/stores/useMovieList'
import { useDiscoverStore } from '@/stores/useDiscover'
import Carousel from '@/components/Carousel.vue';
import CategoryGridCards from '@/components/CategoryGridCards.vue'

defineOptions({
  name: 'IndexPage'
});

const storeMovieList = useMovieListStore();

const storeDiscover = useDiscoverStore()

storeMovieList.getMovieLists('now_playing');
storeMovieList.getMovieLists('popular');
storeMovieList.getMovieLists('top_rated');
storeMovieList.getMovieLists('upcoming');

</script>

<template>
  <q-page :class="{
    'absolute-full': $q.screen.gt.sm
  }">
    <Carousel :discoverData="storeDiscover.movies" />
    <CategoryGridCards title="Now Playing" :movies="storeMovieList.nowPlaying" />
    <CategoryGridCards title="Popular" :movies="storeMovieList.popular" />
    <CategoryGridCards title="Top Rated" :movies="storeMovieList.topRated" />
    <CategoryGridCards title="Upcoming" :movies="storeMovieList.upcoming" />
  

    <!-- <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component> -->
  </q-page>
</template>
