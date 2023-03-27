<template>
   <div @click="closeForm" class="currency_form__backdrop"></div>
    <div class="currency_form">
      <form @submit.prevent="submitHandler">

         <div class="currency_form__header">
            <Button type="button" @click="closeForm" variant="ghost">
               <font-awesome-icon icon="fa-solid fa-times" /> 
            </Button>
            <span class="currency_form__header__title">{{ currencyId == -1 ? 'Add Currency' : 'Edit Currency' }}</span>

            <div style="margin-left: auto;">
              <Button type="button" @click="closeForm" style="margin-right: 8px;" variant="secondary">Cancel</Button> 
              <Button type="submit">{{ currencyId == -1 ? 'Add' : 'Save' }}</Button> 
            </div>
         </div>

         <div class="currency_form__form">
            <div class="currency_form__group">
                  <label>Currency name</label>
                  <Input 
                     v-model:value="title"
                     placeholder="Add name" 
                    @blur="checkField('title')" 
                   :error="titleError" 
                   required
                  />
                  <span class="currency_form__group-error" v-if="titleError">Please enter a name</span>
            </div>
            <div class="currency_form__group">
                  <label>Currency code</label>
                  <Input 
                     v-model:value="code"
                     placeholder="e.g. USD" 
                    @blur="checkField('code')" 
                    @keyup="validateCode()"
                     :error="!isCodeUnique || codeError"
                   required
                  />
                  <span class="currency_form__group-error" v-if="!isCodeUnique">Currency with same code already exits</span>
                  <span class="currency_form__group-error" v-else-if="codeError">
                     {{ codeErrorMessage }}
                  </span>
            </div>
            <div class="currency_form__group">
                  <label>Currency symbol</label>
                  <Input 
                  v-model:value="symbol" 
                  placeholder="Add symbol" 
                    @blur="checkField('symbol')" 
                  :error="symbolError" 
                   required
                  />
                  <span class="currency_form__group-error" v-if="symbolError">Please enter a symbol</span>
            </div>
         </div>

      </form>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Button from './Button.vue';
import Input from './Input.vue';

export default defineComponent({
   components: {
      Button,
      Input
   },
   props: {
    currencyId: {
        type: Number,
        required: true
    } 
   },
   data() {
      return {
        title: "",
        code: "",
        symbol: "",
        isCodeUnique: true,
        titleError: false,
        symbolError: false,
        codeError: false,
        codeErrorMessage: "" 
      }
   },
   computed: {
      isFormValid() {
         if(this.isCodeUnique && !this.titleError && !this.codeError && !this.symbolError) {
            return true
         } else {
            return false
         }
      }
   },
   methods: {
    closeForm() {
       this.$router.push({
        path: "/",
        query: {}
       }) 
    },
    submitHandler() {
      if(!this.isFormValid) return 
      if(this.currencyId === -1) {
         this.addNew()
      }else {
        this.updateCurrency() 
      }

    },
 
    updateCurrency() {
      
      //@ts-ignore
      this.$store.dispatch("currency/updateCurrency", {ID: this.currencyId, title: this.title.trim(), code: this.code, symbol: this.symbol}) 
      this.closeForm()
    }, 
      
    addNew() {
      //@ts-ignore
      this.$store.dispatch("currency/addCurrency", {title: this.title.trim(), code: this.code, symbol: this.symbol}) 
      this.resetForm()
      this.closeForm()
    },
      
    checkField(name: string) {
      if(name === 'title') {
         if(this.title === "") {
            this.titleError = true
         } else {
            this.titleError = false
         }
      }

      if(name === 'code') {
         this.validateCode()
      }
      
      if(name === 'symbol') {
         if(this.symbol === "") {
            this.symbolError = true
         } else {
            this.symbolError = false
         }
      }
    },
    
    resetForm() {
     this.title = "" 
     this.code = "" 
     this.symbol = "" 
     this.isCodeUnique = true
     this.titleError = false
     this.codeError = false
     this.codeErrorMessage = "" 
     this.symbolError = false
    },

    validateCode(code?:string) {
      let newCode = code || this.code
         if(newCode.length !== 3) {
            this.isCodeUnique = true
            this.codeError = true 
            this.codeErrorMessage = "Code must be exactly 3 characters long"
         } else {
            this.codeError = false
            //@ts-ignore
            this.isCodeUnique = this.$store.getters['currency/isUniqueCode'](newCode, this.currencyId)
            if(!this.isCodeUnique) {
               this.codeErrorMessage = "Currency already exits with same code"
            }else {
               this.codeErrorMessage = ""
            }
         }
      
    },
    closeOnEscape(e: KeyboardEvent) {
        if(e.key === "Escape") {
            this.closeForm()
        } 
    }
   },
   watch: {
      title(newTitle) {
         if(this.titleError) {
           this.checkField('title')
         }
      },
      symbol(newTitle) {
         if(this.symbolError) {
           this.checkField('symbol')
         }
      },
      currencyId:{
         handler(newId, oldId) {
               if(newId !== -1) {
                  //populate form  
                  //@ts-ignore
                  let currency = this.$store.getters["currency/currency"](newId) 
                  if(currency) {
                     this.title = currency.title 
                     this.code = currency.code
                     this.symbol = currency.symbol
                  }
               } else {
                  this.resetForm()
               }
         },
         immediate: true
      }
   },
   beforeDestroy(){
       window.removeEventListener("keyup", this.closeOnEscape)
   },
   mounted() {
       window.addEventListener("keyup", this.closeOnEscape)
   },
})
</script>
<style scoped lang="scss">
.currency_form {
   min-width: 440px; 
   height: 100%;
   border-left: 1px solid var(--border-color-gray); 
   background: #fff; 
   @media screen and (max-width: 1350px) {
         position: fixed; 
         top: var(--header-height);
         right: 0px;
         z-index: 30;
       
   } 
  @media screen and (max-width: 440px) {
            min-width: 100px; 
            width: 100%;
   }
}

.currency_form__backdrop {
   position: fixed; 
   top: var(--header-height);
   left: 0px;
   width: 100%;
   height: calc(100% - var(--header-height));
   background: rgba(0,0,0,.2);
   z-index: 20;
   @media screen and (min-width: 1350px) {
      display: none;
   }
   
}

.currency_form__header {
   height: 58px;
   padding: 12px 16px; 
   display: flex;
   align-items: center;
   border-bottom: 1px solid var(--border-color-gray);
}

.currency_form__header__title {
  margin-left: 10px; 
}

.currency_form__form {
   padding: 17px 24px;
}

.currency_form__group {
   margin-bottom: 1rem;
   label {
     font-size: 0.9rem;
     color: var(--color-black-80); 
     font-weight: 600;
     display: block; 
     margin-bottom: 10px;
   }
}
.currency_form__group-error {
  color: red; 
  font-size: 0.8rem;
}
</style>