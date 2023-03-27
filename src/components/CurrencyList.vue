<template>
   <div class="currency_list">

        <div class="currency_list__row currency_list__header">
                <div class="currency_list__col_full">
                        CURRENCY NAME
                </div>
                <div class="currency_list__col">
                    CURRENCY CODE
                </div>
                <div class="currency_list__col">
                    CURRENCY SYMBOL
                </div>
        </div>
        
        <div class="currency_list__no_currency" v-if="currencies.length === 0">
            {{filterQuery !== "" ? 'No matches' : 'There are no currencies added'}}
        </div>

        <div 
            v-for="currency in currencies"
            class="currency_list__hover"
            :key="currency.ID"
        >
            <div @click="openCurrency(currency.ID)" class="currency_list__row">
                    <div class="currency_list__col_full">
                        {{ currency.title }}
                    </div>  
                    <div class="currency_list__col">
                        {{ currency.code }}
                    </div>
                    <div class="currency_list__col">
                        {{ currency.symbol }}
                    </div>
            </div>
            
        <div class="currency_list__delete_button_container">
                    <Button @click="deleteCurrency(currency.ID)" variant="ghost"> 
                        <font-awesome-icon icon="fa-solid fa-trash-can" /> 
                    </Button> 
            </div> 
        </div>
   </div> 
</template>
<script lang="ts">
import type { Currency } from '@/types/Currency';
import { defineComponent } from 'vue';
import Button from './Button.vue';

export default defineComponent({
    components: {
        Button
    },
    computed: {
        currencies():Currency[] {
         //@ts-ignore
            return this.$store.getters["currency/currencies"]
        },
        filterQuery():string {
         //@ts-ignore
            return this.$store.getters["currency/filter"]
        } 
    },
    methods: {
       deleteCurrency(ID: number) {
         //@ts-ignore
            this.$store.dispatch('currency/deleteCurrency', ID)
       },
       openCurrency(ID:number) {
            this.$router.push({
                path: '/',
                query: {
                    currency: ID
                }
            })
       }
    }
})
</script>
<style scoped lang="scss">
.currency_list {
   width: 100%;
   overflow: auto;
}

.currency_list__row {
   position: relative;
   width: 100%;
   height: 39px; 
   display: flex;
   cursor: pointer;
   border-bottom: 1px solid var(--border-color-gray);
   &:hover  {
    background-color: rgba(0,0,0,.03); 
   }
}
.currency_list__hover {
    width: 100%;
   display: flex;
   cursor: pointer;
   position: relative;
   height: 39px;
}
.currency_list__col_full {
   flex: 1; 
   min-width: 150px;
   height: 100%;
   display: flex;
   align-items: center;
   font-size: 0.9rem;
   font-weight: 600;
}
.currency_list__col {
    width: 222px;
    min-width: 150px;
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    color: var(--color-black-40);
    position: relative;

    @media screen and (max-width: 400px) {
        display: none; 
    }
}

.currency_list__header {
   color: var(--color-black-40);
   font-size: 0.7rem;
   cursor: default;
   &:hover {
    background: transparent;
   }
}

.currency_list__delete_button_container {
    position: absolute;
    top:0px;
    right: 0px;
    height: 100%;
    width:40px;
    display: flex;
    align-items: center;
    &:hover {
        background: transparent;
    }
}

.currency_list__no_currency {
    font-size: 1rem;
    color: var(--color-black-40);
    text-align: center;
    margin-top: 10px;
}
</style>