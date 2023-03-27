<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app_wrapper">
  <RouterView />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  beforeCreate() {
   //@ts-ignore 
   this.$store.commit('currency/INIT_STORE') 
  }
})
</script>
<style scoped lang="scss">
.app_wrapper {
  width: 100%;
  height: 100vh; 
}
</style>
