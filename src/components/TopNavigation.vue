<template>
   <nav>
        <div class="nav_brand">
              <div class="avatar">A</div> 
              <div class="nav_brand__info">
                    <div class="nav_brand__name">brand name</div>
                   <div class="nav_brand__store_name">All Stores</div> 
              </div>
        </div>

        <div class="nav_options">
            <Button variant="ghost">
                <font-awesome-icon icon="fa-solid fa-bell" />
            </Button>

            <Button variant="ghost">
                <font-awesome-icon icon="fa-solid fa-user" />
            </Button>
        </div>
   </nav> 
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Button from './Button.vue';
export default defineComponent({
   components: {
    Button
   } 
})
</script>
<style scoped lang="scss">
nav {
    display: flex; 
    height: var(--header-height);
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 0px 20px;
   border-bottom: 1px solid var(--border-color-gray); 
}
.nav_brand {
    display: flex;
    gap: 15px;
    align-items: center;
   .avatar {
    width: 2rem;
    height: 2rem; 
    background: var(--color-primary);
    display: flex;
    align-items: center;
    justify-content: center; 
    border-radius: 100%;
    color: #fff;
   } 

   .nav_brand__info {
    display: flex; 
    flex-direction: column; 
    gap: 5px;
   }

   .nav_brand__name {
    color: var(--color-black-60); 
    text-transform: uppercase;
    font-size: 0.7rem;
   }
   .nav_brand__store_name {
    color: var(--color-black-100); 
    text-transform: capitalize;
    font-size: 0.9rem;
    font-weight: 600;
   }
}

.nav_options {
   display: flex; 
   gap: 5px;
}
</style>