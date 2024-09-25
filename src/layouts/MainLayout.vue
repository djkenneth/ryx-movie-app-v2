<script setup lang="ts">
import Container from '../components/ContainerLayout.vue'
import { ref } from 'vue';

defineOptions({
  name: 'MainLayout'
});

const search = ref<string>('')
const mode = ref<'dark' | 'light'>('light')

function toggleToLight() {
  mode.value = 'light'
}

function toggleToDark() {
  mode.value = 'dark'
}

</script>

<template>
  <q-layout view="lHh Lpr lFf">

    <q-header elevated class="bg-transparent q-py-sm">
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
