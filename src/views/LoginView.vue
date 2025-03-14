<template>
    <div class="login-container">
      <h1>Sistema de Gestión Profesional</h1>
      <login-form @login-success="handleLoginSuccess" />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  import LoginForm from '@/components/auth/LoginForm.vue'
  
  
  export default defineComponent({
    name: 'LoginView',
    components: {
      LoginForm
    },
    methods: {
      handleLoginSuccess(): void {
        this.$router.push({ name: 'Dashboard' })
      }
    }
  })
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 40px 20px;
    text-align: center;
  }
  </style>