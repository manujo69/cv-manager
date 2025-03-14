<template>
    <div class="login-form">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            required 
            placeholder="usuario@ejemplo.com"
          />
        </div>
        
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            required 
            placeholder="Tu contraseña"
          />
        </div>
  
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
  
        <button type="submit" :disabled="isLoading">
          {{ isLoading ? 'Accediendo...' : 'Acceder' }}
        </button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  import type { User } from '../../models';
  
  export default defineComponent({
    name: 'LoginForm',
    data() {
      return {
        email: '',
        password: '',
        error: null as string | null,
        isLoading: false
      }
    },
    methods: {
      handleSubmit(): void {
        this.isLoading = true;
        this.error = null;
        
        // Simulating API call for login
        setTimeout(() => {
          // For demo purposes, any credentials will work
          const user: User = {
            id: 1,
            name: 'Usuario Demo',
            email: this.email
          };
          
          // Store user in localStorage for "authentication"
          localStorage.setItem('user', JSON.stringify(user));
          
          this.isLoading = false;
          this.$emit('login-success');
        }, 1000);
      }
    }
  })
  </script>
  
  <style scoped>
  .login-form {
    background: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
  
  button:disabled {
    background: #9e9e9e;
  }
  
  .error-message {
    color: red;
    margin-bottom: 15px;
  }
  </style>