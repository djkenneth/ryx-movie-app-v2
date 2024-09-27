<script setup lang="ts">
import { ref } from 'vue';
import { useWindowScroll } from '@vueuse/core'
import { useDiscoverStore } from '@/stores/useDiscover'
import Container from '../components/ContainerLayout.vue'

defineOptions({
  name: 'MainLayout'
});

const search = ref<string>('')
const mode = ref<'dark' | 'light'>('light')

const storeDiscover = useDiscoverStore();
storeDiscover.getDiscovers('movie', '2024');
storeDiscover.getDiscovers('tv', '2024');

const { y } = useWindowScroll()

function toggleToLight() {
  mode.value = 'light'
}

function toggleToDark() {
  mode.value = 'dark'
}

</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <!-- :class="{'nav-section-scrolling': y > 100}" -->
    <q-header elevated class="q-py-sm" :class="y > 100 ? 'bg-dark-1' : 'bg-transparent'">
      <Container>
        <q-toolbar class="flex items-center" style="gap: 20px">
          <q-toolbar-title>
            <router-link to="/">
              <q-img src='ryx-logo.png' width="8rem" />
            </router-link>
          </q-toolbar-title>

          <div class="q-pa-md" :class="{
            'hidden': $q.screen.lt.md,
            'block': $q.screen.gt.md
          }">
            <q-btn flat label="Movie" class="text-white" to="/" />
            <q-btn flat label="TV Shows" class="text-white" to="/tv-show" />
            <q-btn flat label="Browse" class="text-white" />
            <q-btn flat label="Person" class="text-white" />
            <q-btn flat label="Liked" class="text-white" />
          </div>

          <q-input rounded dense standout placeholder="Search movie or tv show" v-model="search" bg-color="grey-8"
            :class="{
              'hidden': $q.screen.lt.md,
              'block': $q.screen.gt.md
            }" style="width: 300px" />

          <q-icon v-if="mode === 'dark'" name="brightness_5" size="2em" @click="toggleToLight" />
          <q-icon v-if="mode === 'light'" name="brightness_7" size="2em" @click="toggleToDark" />
          <!-- <div>Quasar v{{ $q.version }}</div> -->
        </q-toolbar>
      </Container>

    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
