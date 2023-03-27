<template>
    <div class="currency_form">
        <span v-if="currencyId != -1">Update Currency</span>
       <span v-else>New Currency</span> 
      <button @click="closeForm">x</button> 
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
   props: {
    currencyId: {
        type: Number,
        required: true
    } 
   },
   methods: {
    closeForm() {
       this.$router.push({
        path: "/",
        query: {}
       }) 
    }
   } 
})
</script>
<style lang="scss">
.currency_form {
   min-width: 300px; 
   height: 100%;
   border-left: 1px solid var(--border-color-gray); 
}
</style>