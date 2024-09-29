<script setup lang="ts">
import { useRouter } from 'vue-router'
import Container from '@/components/ContainerLayout.vue'
import { Discover } from '@/types';
// import { useMovieListStore } from '@/stores/useMovieList'
import imagePath from '@/utils/imagePath';

defineOptions({
    name: 'CategoryGridCards'
});

const router = useRouter()

interface Props {
    title: string
    type: 'movie' | 'tv'
    movies?: Discover[];
};

withDefaults(defineProps<Props>(), {
    movies: () => []
});

const viewRedirect = (item: Discover, type: 'movie' | 'tv') => {
    if (type === 'movie') {
        return router.push({
            name: 'view-movie',
            params: { title: item.title, id: item.id }
        })
    } else if (type === 'tv') {
        return router.push({
            name: 'view-tv',
            params: { name: item.name, id: item.id }
        })
    }
    // console.log('type', type)
    // console.log('item', item)
}

</script>

<template>
    <Container mainClassName="bg-dark-1">
        <div class="example-row-equal-width q-py-xl">
            <h3 class="text-weight-bold text-white q-my-none q-mb-lg" :class="{
                'text-h4': $q.screen.lt.md,
                'text-h3': $q.screen.gt.md,
            }">{{ title }}</h3>
            <div class="row">
                <div v-for="item in movies" :key="item.id" class="col-xs-6 col-sm-3 col-md-3 col-lg-2">
                    <q-card class="rounded" @click="viewRedirect(item, type)">
                        <q-img :src="imagePath(item.poster_path, 'w500')" fit="cover"
                            :height="$q.screen.gt.md ? '300px' : '200px'">
                            <div class="absolute-bottom">
                                <div class="flex column">
                                    <span class="text-h6">{{ item.title || item.name }}</span>
                                    <span v-if="item.release_date" class="text-body2">{{ item.release_date.slice(0, 4)
                                        }}</span>
                                    <span v-if="item.first_air_date" class="text-body2">{{ item.first_air_date?.slice(0,
                                        4) }}</span>
                                </div>
                            </div>
                        </q-img>
                    </q-card>
                </div>
            </div>
        </div>
    </Container>

</template>

<style lang="scss" scoped>
.example-row-equal-width {
    .rounded {
        border-radius: 20px
    }

    .row>div {
        padding-inline: 5px;
        padding-block: 10px;
        // background: rgba(#999, .15);
        // border: 1px solid rgba(#999, .2);
    }

    // .row+.row {
    //     margin-top: 1rem;
    // }
}
</style>