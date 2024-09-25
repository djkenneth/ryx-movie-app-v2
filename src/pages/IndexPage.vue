<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import imagePath from '../utils/imagePath';
import { Discover } from 'src/types';

// import { useQuasar } from 'quasar';
// import { Todo, Meta } from 'components/models';
// import ExampleComponent from 'components/ExampleComponent.vue';
// const q = useQuasar();

defineOptions({
  name: 'IndexPage'
});

  const slide = ref(1)
  const autoplay = ref(true)
  const movies = ref<Discover[]>([])

  const discoverMovie = async () => {
    try {
      const type = 'movie';
      const sortBy = 'popularity.desc';
      const page = 1;
      const year = 2024;
      // const genre = 'Action';
      const res = await axios.get(`https://api.themoviedb.org/3/discover/${type}?api_key=${import.meta.env.VITE_APP_TMDB_API_KEY}&sort_by=${sortBy}&page=${page}&${type === 'movie' ? 'year=' : 'primary_release_year='}${year}`)
      movies.value = res.data.results.splice(0, 7)
    } catch (err) {
      console.log(err)
    }
  }

  onMounted(() => {
    discoverMovie()
  })

// const todos = ref<Todo[]>([
//   {
//     id: 1,
//     content: 'ct1'
//   },
//   {
//     id: 2,
//     content: 'ct2'
//   },
//   {
//     id: 3,
//     content: 'ct3'
//   },
//   {
//     id: 4,
//     content: 'ct4'
//   },
//   {
//     id: 5,
//     content: 'ct5'
//   }
// ]);

// const meta = ref<Meta>({
//   totalCount: 1200
// });
</script>

<template>
  <q-page :class="{
    'absolute-full': $q.screen.gt.sm
  }">
    <!-- <q-img src='https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' width="100%" /> -->
     <div>
      <q-carousel
        animated
        v-model="slide"
        navigation
        infinite
        arrows
        :autoplay="autoplay"
        transition-prev="slide-right"
        transition-next="slide-left"
        height="600px"
      >
        <q-carousel-slide v-for="item in movies" :key="item.id" :name="item.id" :img-src="imagePath(item.backdrop_path, 'original')" />
      </q-carousel>
    </div>
    <!-- <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component> -->
  </q-page>
</template>
