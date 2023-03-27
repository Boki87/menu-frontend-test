<template>
   <div class="layout">
      <TopNavigation />
      <div class="layout__content">
         <Sidebar />
         <main>
            <slot></slot>
         </main>
      </div>
   </div> 
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import TopNavigation from './TopNavigation.vue'
import Sidebar from './sidebar/Sidebar.vue';

export default defineComponent({
 components: {
   TopNavigation,
   Sidebar
 }  
})
</script>
<style scoped lang="scss">
.layout {
   width: 100%;
   height: 100%;
}

.layout__content {
   display: flex;
   width: 100%; 
   height: calc(100% - var(--header-height)); 
   overflow: hidden;
   main {
      flex: 1;
      background: #fff;
      overflow-x: hidden; 
   }
}
</style>