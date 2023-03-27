<template>
   <button 
      @click="gotoPath" 
      class="sidebar_item" 
      :class="{
         'sidebar_item__active': isActive
      }">
         <font-awesome-icon :icon="item.icon" />
         <span>{{ item.title }}</span>
   </button> 
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import type {PropType} from 'vue'

interface ISidebarItem {
   title: string;
   icon: string;
   path: string;   
}

export default defineComponent({
  props: {
   item: {
      type: Object as PropType<ISidebarItem>,
      required: true 
   } 
  },
  computed: {
      isActive() {
         return this.$route.path === this.item.path
      }
  },
  methods: {
   gotoPath() {
      this.$router.push(this.item.path)
   }
  }
})
</script>
<style lang="scss">
   .sidebar_item {
      width: 100%; 
      height: 2.5rem;
      border-radius: var(--radius-sm);
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      gap: 14px;
      cursor: pointer;
      margin-bottom: var(--margin-sm);
      padding: 0px 13px;
      &:hover {
         background: var(--color-primary-light); 
         color: var(--color-primary);
         svg, span {
            color: var(--color-primary);
         }
      }
     
      svg {
        color: #808080; 
      }
      span {
         color: var(--color-black-100);
      } 

      @media screen and (max-width: 950px) {
         padding: 0px 8px;
         justify-content: center;
         span {
            display: none;
         }  
      }
   } 
  
   .sidebar_item__active {
         background: var(--color-primary-light); 
         color: var(--color-primary);
         svg, span {
            color: var(--color-primary);
         }
   }
</style>