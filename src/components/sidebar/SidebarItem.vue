<template>
   <button class="sidebar_item">
    <slot></slot> 
   </button> 
</template>
<style lang="scss">
   .sidebar_item {
    width: 100%; 
    height: 2rem;
    border-radius: var(--radius-sm);
   } 
</style>