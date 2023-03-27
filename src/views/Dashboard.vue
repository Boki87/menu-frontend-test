<template>
    <DashboardLayout>
        <div class="currency_wrapper">

            <div class="currency_left">
                <div class="currency_add">
                        <h1>Currencies</h1> 
                        <Button @click="addNewCurrency">
                            <font-awesome-icon icon="fa-solid fa-plus" />  
                        <span>Add Currency</span> 
                        </Button> 
                </div> 
                <div class="currency_search__container">
                        <Input 
                            @input="queryCurrencies"
                            style="max-width: 300px"
                            placeholder="Search"
                            type="search"
                        >
                            <template v-slot:leftIcon>
                                <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                            </template>
                        </Input>
                </div>
                <div class="currency_list__container">
                    <CurrencyList /> 
                </div>
            </div>

            <CurrencyForm v-if="showForm" :currencyId="currencyToEdit" />
         </div>
    </DashboardLayout>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import DashboardLayout from '@/components/DashboardLayout.vue';
import Button from '@/components/Button.vue';
import Input from '@/components/Input.vue';
import CurrencyList from '@/components/CurrencyList.vue';
import CurrencyForm from '@/components/CurrencyForm.vue'

export default defineComponent({
    components: {
       DashboardLayout,
       Button,
       Input,
       CurrencyList,
       CurrencyForm
    },
    computed: {
        showForm() {
            return this.$route.query.addNew === null || this.$route.query.currency 
        },
        currencyToEdit() {
            return parseInt(this.$route.query.currency?.toString() || "-1")  
        }
    },
    methods: {
        queryCurrencies(e: InputEvent) {
            let input = e.target as HTMLInputElement
            this.$store.dispatch('currency/setFilter',input.value.toLowerCase())     
        },
        addNewCurrency() {
           this.$router.push({
            path: "/",
            query: {addNew: null}
           }) 
        },
    },
})
</script>
<style scoped lang="scss">
.currency_add {
   display: flex; 
   align-items: center;
   justify-content: space-between;
   svg {
    margin-right: 10px;
   }
   h1 {
    font-size: 1.7rem;
    color: var(--color-black-100); 
    @media screen and (max-width:500px) {
        font-size: 1.1rem; 
    }
   }
   @media screen and (max-width: 500px) {
        margin-bottom: 20px; 
   }
}
.currency_search__container {
   margin-bottom: var(--margin-md);
}

.currency_wrapper {
   display: flex; 
   height: 100%;
   width:100%;
   max-width: 100%;
}
.currency_left {
    flex: 1;
    max-width: 100%; 
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 2rem;
}

.currency_list__container {
    flex: 1;
    overflow: auto;
    width: 100%;
}

.currency_content {
    width: 100%;
    height: 100%;
    flex: 1; 
    overflow-y: auto;
    display: flex;
}

</style>