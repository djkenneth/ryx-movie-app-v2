<script setup lang="ts">
import { useTvShowListStore } from '@/stores/useTvShowList'
import Carousel from '@/components/Carousel.vue';
import { useDiscoverStore } from '@/stores/useDiscover'
import CategoryGridCards from '@/components/CategoryGridCards.vue'

defineOptions({
  name: 'TVShowPage'
});

const storeTvShowList = useTvShowListStore();

const storeDiscover = useDiscoverStore()

storeTvShowList.getTvShowLists('airing_today');
storeTvShowList.getTvShowLists('on_the_air');
storeTvShowList.getTvShowLists('popular');
storeTvShowList.getTvShowLists('top_rated');

</script>
<template>
  <q-page :class="{
    'absolute-full': $q.screen.gt.sm
  }">
    <Carousel :discoverData="storeDiscover.tv" />
    <CategoryGridCards title="Airing Today" :movies="storeTvShowList.airingToday" />
    <CategoryGridCards title="On The Air" :movies="storeTvShowList.onTheAir" />
    <CategoryGridCards title="Popular" :movies="storeTvShowList.popular" />
    <CategoryGridCards title="Top Rated" :movies="storeTvShowList.topRated" />
  </q-page>
</template>