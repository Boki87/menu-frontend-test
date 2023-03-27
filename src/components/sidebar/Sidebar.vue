<template>
   <div class="sidebar">
      <SidebarItem 
      v-for="item in items" 
      :item="item"
      :key="item.title" /> 

      <div style="flex: 1;"></div>

      <Button @click="signOut" style="width: 100%;">
        <div class="sidebar__signout_button">
            <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" />
            <span>Sign out</span> 
        </div> 
      </Button>
   </div> 
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import SidebarItem from './SidebarItem.vue';
import Button from '../Button.vue';
import { authService } from '@/utils/api';

export default defineComponent({
  components: {
   SidebarItem,
   Button
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
  },
  methods: {
   signOut() {
         this.$store.dispatch('auth/logout').then(() => {
            this.$router.push('/login') 
         })
   }
  } 
})
</script>
<style scoped lang="scss">
    .sidebar {
       width: 256px;     
       background: #F2F2F2; 
       padding: 12px;
       display: flex;
       flex-direction: column;
       @media screen and (max-width: 950px) {
         width: 50px; 
         padding: 8px;
       }
    }
    .sidebar__signout_button {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
         transform: rotate(180deg);
         margin-right: 10px; 
      }

      @media screen and (max-width:950px) {
         svg {
            margin: 0px;
         }
         span {
            display: none;
         }
      }
    }
</style>
