<script setup lang="ts">
import Carousel from '@/components/Carousel.vue';


// import { Todo, Meta } from 'components/models';
// const q = useQuasar();

defineOptions({
  name: 'IndexPage'
});


</script>

<template>
  <q-page :class="{
    'absolute-full': $q.screen.gt.sm
  }">
    <Carousel />
    <div class="example-row-equal-width">
      <div class="row">
        <div class="col-xs-12 col-sm-4 col-md-3 col-lg-2">
          <q-card class="my-card">
            <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
              <div class="absolute-bottom text-subtitle2 text-center">
                Title
              </div>
            </q-img>
          </q-card>
        </div>
        <div class="col-xs-12 col-sm-4 col-md-3 col-lg-2">
          <q-card class="my-card">
            <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
              <div class="absolute-bottom text-subtitle2 text-center">
                Title
              </div>
            </q-img>
          </q-card>
        </div>
        <div class="col-xs-12 col-sm-4 col-md-3 col-lg-2">
          <q-card class="my-card">
            <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
              <div class="absolute-bottom text-subtitle2 text-center">
                Title
              </div>
            </q-img>
          </q-card>
        </div>
        <div class="col-xs-12 col-sm-4 col-md-3 col-lg-2">
          <q-card class="my-card">
            <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
              <div class="absolute-bottom text-subtitle2 text-center">
                Title
              </div>
            </q-img>
          </q-card>
        </div>
        <div class="col-xs-12 col-sm-4 col-md-3 col-lg-2">
          <q-card class="my-card">
            <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
              <div class="absolute-bottom text-subtitle2 text-center">
                Title
              </div>
            </q-img>
          </q-card>
        </div>
      </div>
    </div>


    <!-- <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component> -->
  </q-page>
</template>

<style lang="scss" scoped>
.example-row-equal-width {
  .row > div {
    padding: 10px 15px;
    background: rgba(#999,.15);
    border: 1px solid rgba(#999,.2);
  }
  .row + .row {
    margin-top: 1rem;
  }
}
  
</style>
