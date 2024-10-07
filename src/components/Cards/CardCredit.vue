<script setup lang="ts">
import { Cast } from '@/types';
import imagePath from '@/utils/imagePath';


defineOptions({
    name: 'CardCredit'
});

interface Props {
    casts?: Cast[]
};

withDefaults(defineProps<Props>(), {
    casts: () => []
});

</script>

<template>
    <div class="row q-gutter-md">
        <div v-for="cast in casts" :key="cast?.cast_id" class="col-2">
            <q-card class="tw-rounded-md bg-dark-1">
                <q-img :src="imagePath(cast.profile_path, 'w200')" fit="cover"
                    :height="$q.screen.gt.md ? '220px' : '200px'">
                </q-img>
                <q-card-section class="q-pa-sm">
                    <div class="text-subtitle1">{{ cast.original_name }}</div>
                    <div class="text-subtitle2">as {{ cast?.known_for_department }}</div>
                </q-card-section>
            </q-card>
        </div>
    </div>
</template>