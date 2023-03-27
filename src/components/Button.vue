<template>
    <button 
        @click="click" 
        :disabled="isLoading"
        :class="{
            'primary': variant === 'primary', 
            'secondary': variant === 'secondary',
            'ghost': variant === 'ghost'
            }"
    >

        <slot v-if="!isLoading"></slot>
        <font-awesome-icon v-else class="spin" icon="fa-solid fa-circle-notch" />
    </button>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import type {PropType} from 'vue'

export default defineComponent({
   props: {
    variant: {
        type: String as PropType<'primary' | 'secondary' | 'ghost'>,
        default: 'primary'
    },
    isLoading: {
        type: Boolean,
        default: false
    }
   },
   methods: {
    click() {
       this.$emit('click') 
    }
   }
})
</script>
<style scoped lang="scss">
button {
    font-size: 1rem;
    min-width: 34px;
    height: 34px;
    border: none;
    border-radius: var(--radius-sm);
    cursor: pointer;
    padding: 0px 12px;
    &:hover {
        filter: brightness(95%);
    }
    &:active {
        filter: brightness(90%);
    }
   &:disabled {
    cursor: not-allowed;
    pointer-events: none;
    filter: brightness(90%);
   } 
}

.primary {
    background-color: var(--color-primary); 
    border: 1px solid var(--color-primary);
    color: #fff;
}

.secondary {
    background-color: #fff; 
    border: 1px solid #ccc;
    color: var(--color-black-100);
}

.ghost {
   min-width: 34px;
   background: transparent;  
   border: none;
   color: var(--color-black-40);
   &:hover {
    background: rgba(0,0,0,0.05);
   }
}

.spin {
  animation-name: spin;
  animation-duration: 3000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear; 
}

@keyframes spin {
    from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    }
}

</style>