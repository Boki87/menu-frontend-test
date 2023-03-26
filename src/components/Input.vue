<template>
   <input 
    @input="emitToParent"
    :value="value" 
    :placeholder="placeholder"
    :required="required" 
   /> 
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    props: {
        value: String,
        placeholder: String,
        required: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:value'],
    methods: {
        emitToParent(e: Event) {
            let input = e.target as HTMLInputElement 
            this.$emit('update:value', input.value)
        }
    }

})
</script>
<style scoped lang="scss">
    input {
        width: 100%;
        height: 34px;
        padding: 6px 13px;
        border: 1px solid #ccc;
        border-radius: var(--radius-sm); 
        outline: none; 
        font-size: 0.8rem;
        margin-bottom: var(--margin-sm);
        &:focus {
            border: 2px solid var(--color-primary);
        }
    }
</style>