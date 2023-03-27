<template>
    <div class="input_container">
        <div 
            v-if="hasIcon"
            class="input_container__left_icon"
        >
            <slot name="leftIcon"></slot>
        </div> 
        <input 
            @input="emitToParent"
            :value="value" 
            :placeholder="placeholder"
            :required="required" 
            v-bind="$attrs"
            :style="{paddingLeft: hasIcon ? '34px' : '13px'}"
            :class="{'input__error': error}"
        /> 
    </div>
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
        },
        leftIcon: {
            type: Boolean,
            default: false
        },
        error: {
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
    },
    computed: {
        hasIcon() {
            return !!this.$slots['leftIcon']
        }
    },

})
</script>
<style scoped lang="scss">
    input {
        width:100%;
        height: 34px;
        padding: 6px 13px;
        border: 1px solid #ccc;
        border-radius: var(--radius-sm); 
        outline: none; 
        font-size: 0.8rem;
        &:focus {
            border: 2px solid var(--color-primary-2);
        }
    }
   
    .input__error {
       border: 2px solid red; 
        &:focus {
            border: 2px solid red; 
        }
    } 

    .input_container {
       position: relative; 
       height: 34px;
    }
    .input_container__left_icon {
        position: absolute; 
        height: 100%;
        width: 34px;
        left: 0px;
        top:0px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>