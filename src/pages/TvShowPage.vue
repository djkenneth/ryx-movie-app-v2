<script setup lang="ts">
import { onMounted } from 'vue';
import { useTvShowListStore } from '@/stores/useTvShowList'
import Carousel from '@/components/Carousel.vue';
import { useDiscoverStore } from '@/stores/useDiscover'
import CategoryGridCards from '@/components/CategoryGridCards.vue'

defineOptions({
  name: 'TVShowPage'
});


const storeTvShowList = useTvShowListStore();
const storeDiscover = useDiscoverStore()

onMounted( async () => {
  await storeTvShowList.getTvShowLists();
  // await storeTvShowList.getTvShowLists('on_the_air');
  // await storeTvShowList.getTvShowLists('popular');
  // await storeTvShowList.getTvShowLists('top_rated');
})

</script>
<template>
  <q-page :class="{
    'absolute-full': $q.screen.gt.sm
  }">
    <Carousel :discoverData="storeDiscover.tv" />
    <CategoryGridCards title="Airing Today" type="tv" :movies="storeTvShowList.airingToday" />
    <CategoryGridCards title="On The Air" type="tv" :movies="storeTvShowList.onTheAir" />
    <CategoryGridCards title="Popular" type="tv" :movies="storeTvShowList.popular" />
    <CategoryGridCards title="Top Rated" type="tv" :movies="storeTvShowList.topRated" />
  </q-page>
</template>