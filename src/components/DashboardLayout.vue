<template>
   <div class="layout">
      <TopNavigation />
        <slot></slot>
   </div> 
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import TopNavigation from './TopNavigation.vue'

export default defineComponent({
 components: {
   TopNavigation
 }  
})
</script>
<style scoped lang="scss">
.layout {
   width: 100%;
   height: 100%;
}
</style>