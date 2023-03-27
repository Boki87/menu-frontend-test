<template>
    <div class="login_form">
            <img src="/assets/logo.png" class="login_form__logo"/> 
        <div>
           <h1>Sign in</h1> 
           <p>Please enter your email and password</p>
        </div>
        <div>
            <form @submit.prevent="submitHandler">
                <Input 
                    v-model:value="email" 
                    placeholder="Your email address" 
                    type="email"
                   required 
                />

                <Input 
                    v-model:value="password"
                    placeholder="Password" 
                    type="password"
                    required
                />
            
                <Button 
                    style="width:100%"    
                    type="submit"
                    :isLoading="loading" 
                >
                    Sign in
                </Button>
            </form>
        </div>

    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Input from './Input.vue'
import Button from './Button.vue'

export default defineComponent({
   components: {
    Input,
    Button
   }, 
   data() {
        return {
            email: "demo@email.com",
            password: "demo123",
            loading: false
        } 
   },
   methods: {
    submitHandler() {
        this.loading = true
        this.$store.dispatch("auth/login", {email: this.email, password: this.password}).then(() => {
            this.$router.push("/")
       })
       .catch((err: string) => {
            console.log(err)
       })
       .finally(() => {
        this.loading = false
       })
    }
   }
})
</script>
<style scoped lang="scss">
    .login_form {
        background: #fff;
        width: 376px;
        height: 364px;
        border-radius: var(--radius-md);
        padding: 40px;
    }

    .login_form__logo {
        width: 40px;
        height: 40px;
        margin-bottom: var(--margin-sm);
    }

    .login_form h1 {
        font-size: 1.4rem; 
       color: var(--color-black-100); 
    }

    .login_form p {
        font-size: 1rem; 
       color: var(--color-black-60); 
    }
</style>