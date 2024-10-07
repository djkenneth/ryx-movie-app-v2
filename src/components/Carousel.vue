<script setup lang="ts">
import { ref, computed } from 'vue';
import { useQuasar } from 'quasar';
import imagePath from '@/utils/imagePath';
import Container from '@/components/ContainerLayout.vue'
import { Discover } from '@/types';
// import { removeStrspace } from '@/utils';

defineOptions({
  name: 'CarouselComponent'
});

interface Props {
    discoverData?: Discover[];
};

withDefaults(defineProps<Props>(), {
    discoverData: () => []
});

const $q = useQuasar()

const slide = ref(0)
const autoplay = ref(20000)

const buttonSize = computed(() => {
    return $q.screen.gt.sm ? 'md' : 'sm'
})
</script>

<template>
    <q-carousel animated v-model="slide" navigation infinite arrows :autoplay="autoplay" transition-prev="slide-right"
        transition-next="slide-left" :height="$q.screen.gt.md ? '600px' : '90dvh'">
        <q-carousel-slide v-for="(item, index) in discoverData" :key="item.id" :name="index"
            :img-src="imagePath(item.backdrop_path, 'w1280')" class="flex bg-gradient">
            <Container mainClassName="q-my-auto">
                <div class="carousel-content" :class="{
                    'carousel-content-sm': $q.screen.lt.md
                }">
                    <h2 class="text-white text-h2 text-weight-bold q-my-none" :class="{
                        'text-h4': $q.screen.lt.md
                    }">{{ item.title || item.name }}</h2>

                    <h2 class="primary-color text-h2 text-weight-bold q-my-none flex items-start" :class="{
                        'text-h4': $q.screen.lt.md
                    }">{{ item.vote_average.toFixed(1) }} <span class="text-white text-subtitle1">/10</span></h2>

                    <p class="text-white text-subtitle1" :class="{
                        'carousel-overview': $q.screen.lt.md
                    }">{{ item.overview }}</p>

                    <div class="flex gap-10">
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