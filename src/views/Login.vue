<template>
  <div class="login_page">
    <LoginForm />
  </div>
</template>
<script lang="ts">
import LoginForm from '@/components/LoginForm.vue';
export default {
    components: {
      LoginForm
    },
}
</script>
<style lang="scss">
  .login_page {
    width: 100%;
    height: 100vh;
    display: flex; 
    align-items: center;
    justify-content: center;
    background: url(/assets/bg.jpg) 50% 50%/cover no-repeat;
  }
</style>