
import DashboardLayout from '@/components/DashboardLayout.vue';

<template>
    <DashboardLayout>
        <div class="not_found">
            <h3>Page under construction</h3>
        </div>
    </DashboardLayout> 
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import DashboardLayout from '@/components/DashboardLayout.vue';
export default defineComponent({
   components: {
        DashboardLayout
   } 
})
</script>
<style scoped lang="scss">
.not_found {
    width: 100%;
    height: 100%;
    display:flex;
    align-items:center; 
   justify-content: center; 
}
</style>