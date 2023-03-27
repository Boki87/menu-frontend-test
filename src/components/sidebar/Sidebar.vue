<template>
   <div class="sidebar">
      <SidebarItem 
      v-for="item in items" 
      :item="item"
      :key="item.title" /> 
   </div> 
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import SidebarItem from './SidebarItem.vue';

export default defineComponent({
  components: {
   SidebarItem
  },

  data() {
   return {
      items:[
         {
            title: "Analytics",
            path: "/analytics",
            icon: "fa-solid fa-chart-line" 
         },
         {
            title: "Offers",
            path: "/offers",
            icon: "fa-solid fa-ticket" 
         },
         {
            title: "Loyalty",
            path: "/loyalty",
            icon: "fa-solid fa-star" 
         },
         {
            title: "Currency",
            path: "/",
            icon: "fa-solid fa-money-bill-transfer" 
         },
         {
            title: "Dispatch",
            path: "/dispatch",
            icon: "fa-solid fa-person-biking" 
         },
         {
            title: "Configurations",
            path: "/config",
            icon: "fa-solid fa-gear" 
         },
         
      ] 
   }
  } 
})
</script>
<style scoped lang="scss">
    .sidebar {
       width: 256px;     
       background: #F2F2F2; 
       padding: 12px;
    }
</style>
